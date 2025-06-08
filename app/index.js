import { createApp } from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios'; // Added axios
import { createVuetify } from 'vuetify'; // Updated Vuetify
// import VeeValidate, { Validator } from 'vee-validate'; // Commenting out VeeValidate for now
// import msg from './pt_BR'; // Commenting out VeeValidate for now
import App from './src/App.vue';
import router from './routes'; // Import the configured router instance
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

// Vue.use(VueRouter); // Replaced by app.use(router)
// Vue.use(VueResource); // Replaced by axios
// Vue.use(Vuetify); // Replaced by app.use(vuetify)

// Validator.localize(msg); // Commenting out VeeValidate for now
// Vue.use(VeeValidate, { // Commenting out VeeValidate for now
//    locale: 'pt_BR' // Commenting out VeeValidate for now
// });

// const router = new VueRouter({ routes }); // Router instance is now imported

// Axios global configuration
// Ensure this base URL is correct for your API setup
axios.defaults.baseURL = '/'; // Or e.g. 'http://localhost:3000/api' if your API is separate

// Axios interceptors
axios.interceptors.request.use(
    config => {
        // Ensure the URL check is correct for your API routes
        // Assuming API calls are prefixed with 'api/'
        if (config.url && config.url.startsWith('api/')) {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers['X-Access-Token'] = token;
            }
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    response => {
        const tokenHeader = response.headers['x-access-token'];
        if (tokenHeader) {
            localStorage.setItem('token', tokenHeader);
        }
        return response;
    },
    error => {
        if (error.response && error.response.status === 401) {
            router.push({ name: 'login' }); // router is the imported instance
        }
        return Promise.reject(error);
    }
);

// Old Vue.http.interceptors are removed

const app = createApp(App);
const vuetify = createVuetify({
    // Basic Vuetify 3 configuration.
    // May need to import components and directives if not using a resolver.
});

app.use(router); // router instance from ./routes.js
app.use(vuetify);

app.mount('#app');