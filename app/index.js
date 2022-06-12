import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Vuetify from 'vuetify';
import VeeValidate, { Validator } from 'vee-validate';
import msg from './pt_BR';
import App from './src/App.vue';
import { routes } from './routes';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Vuetify);

Validator.localize(msg);
Vue.use(VeeValidate, {
    locale: 'pt_BR'
});

const router = new VueRouter({ routes });

Vue.http.interceptors.push((request, next) => {
    if (request.url.startsWith('api')) {
        request.headers.map['X-Access-Token'] = [localStorage.getItem('token')];
    }

    next(response => {
        if (response.status === 401) {
            router.push({ name: 'login' })
            return;
        }
        localStorage.setItem('token', response.headers.map['x-access-token'][0]);
    });
});

new Vue({
    el: '#app',
    router,
    vuetify: new Vuetify(),
    render: h => h(App)
});