import Vue from 'vue/dist/vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

new Vue({
    el: '#app',
    data: () => ({
        dialog: false,
        processo: false, // cadastro de processo
        drawer: null,
        items: [
            {
                icon: 'keyboard_arrow_up',
                'icon-alt': 'keyboard_arrow_down',
                text: 'Cadastros',
                model: false,
                children: [
                    { text: 'Processos' },
                    { text: 'Ameaças' },
                    { text: 'Níveis de criticidade' },
                    { text: 'Indicativos de ação' }
                ]
            }, {
                icon: 'keyboard_arrow_up',
                'icon-alt': 'keyboard_arrow_down',
                text: 'Relatórios',
                model: false,
                children: [
                    { text: 'Ameaças por processo' },
                    { text: 'Ações mais executadas' }
                ]
            },
            { icon: 'settings', text: 'Configurações' },
            { icon: 'chat_bubble', text: 'Enviar feedback' },
            { icon: 'help', text: 'Ajuda' }
        ]
    }),
    props: {
        source: String
    }
})