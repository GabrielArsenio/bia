import Vue from 'vue/dist/vue'

import VueRouter from 'vue-router/dist/vue-router'
import { routes } from './routes'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import App from './src/App.vue'

Vue.use(VueRouter)
Vue.use(Vuetify)

const router = new VueRouter({ routes });

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});