import Vue from 'vue/dist/vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import App from './src/App.vue'

Vue.use(Vuetify)

new Vue({
    el: '#app',
    render: h => h(App)
});