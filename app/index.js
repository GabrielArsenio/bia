import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Vuetify from 'vuetify';
import App from './src/App.vue';
import { routes } from './routes';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Vuetify);

const router = new VueRouter({ routes });

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});