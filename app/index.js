import Vue from 'vue/dist/vue';
import VueRouter from 'vue-router/dist/vue-router';
import VueResource from 'vue-resource/dist/vue-resource';
import Vuetify from 'vuetify/dist/vuetify';
import App from './src/App.vue';
import { routes } from './routes';
import 'vuetify/dist/vuetify.css';
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