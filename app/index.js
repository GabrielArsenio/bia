import Vue from 'vue/dist/vue.min';
import VueRouter from 'vue-router/dist/vue-router.min';
import VueResource from 'vue-resource/dist/vue-resource.min';
import Vuetify from 'vuetify/dist/vuetify.min';
import App from './src/App.vue';
import { routes } from './routes';
import 'vuetify/dist/vuetify.min.css';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Vuetify);

if (process.env.NODE_ENV !== 'production') {
    Vue.http.options.root = 'http://localhost:3000';
}

const router = new VueRouter({ routes });

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});