import Vue from 'vue/dist/vue';

import VueRouter from 'vue-router/dist/vue-router';
import { routes } from './routes';

import VueResource from 'vue-resource/dist/vue-resource';

import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

import App from './src/App.vue';

Vue.use(VueRouter);

Vue.use(VueResource);
Vue.http.options.root = 'http://localhost:3000/api';

Vue.use(Vuetify);

const router = new VueRouter({ routes });

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});

console.log(process.env.NODE_ENV)