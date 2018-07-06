import Home from './src/components/Home.vue';
import Eventos from './src/components/listas/Eventos.vue';
import Ameacas from './src/components/listas/Ameacas.vue';
import Processos from './src/components/listas/Processos.vue';
import Niveis from './src/components/listas/Niveis.vue';
import Acoes from './src/components/listas/Acoes.vue';

export const routes = [{
    path: '',
    component: Home,
    children: [{
        path: '/eventos',
        component: Eventos
    }, {
        path: '/ameacas',
        component: Ameacas
    }, {
        path: '/processos',
        component: Processos
    }, {
        path: '/niveis',
        component: Niveis
    }, {
        path: '/acoes',
        component: Acoes
    }]
}];