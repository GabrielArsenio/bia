import { createApp } from 'vue';
// import VueRouter from 'vue-router'; // This was for Vue 2 router, Vue 3 router is already configured in routes.js
// import VueResource from 'vue-resource'; // To be replaced with axios
// import Vuetify from 'vuetify'; // This was for Vuetify 2
// import VeeValidate, { Validator } from 'vee-validate'; // This will be updated later (v2)
// import msg from './pt_BR'; // For VeeValidate v2
import App from './src/App.vue';
import { router } from './routes'; // Router for Vue 3

// Vuetify 3 specific imports
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Material Design Icons (if still needed, ensure it's compatible or use Vuetify's icon solutions)
import 'material-design-icons-iconfont/dist/material-design-icons.css';

const app = createApp(App);

// Create Vuetify 3 instance
const vuetify = createVuetify({
  components,
  directives,
  // You can add theme, icons, defaults, etc. here if needed
});

// Vue.use(VueRouter); // Not needed, app.use(router) is used for Vue 3
// Vue.use(VueResource); // To be replaced
// Vue.use(Vuetify); // Not needed for Vue 3, app.use(vuetify) is used

// Validator.localize(msg); // For VeeValidate v2
// Vue.use(VeeValidate, { // VeeValidate v2 registration, will be handled differently for v4
//     locale: 'pt_BR'
// });

// const router = new VueRouter({ routes }); // Router initialization moved to routes.js

// Axios interceptors are now in Service.js

app.use(router);
app.use(vuetify);
// app.use(VeeValidate) // VeeValidate v4 doesn't use Vue.use() in the same way. Components are imported directly.

app.mount('#app');