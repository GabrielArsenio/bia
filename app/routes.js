import Home from './src/components/Home.vue';
import Login from './src/components/Login.vue';
import Usuarios from './src/components/listas/Usuarios.vue';
import Ameacas from './src/components/listas/Ameacas.vue';
import Processos from './src/components/listas/Processos.vue';
import Niveis from './src/components/listas/Niveis.vue';
import Acoes from './src/components/listas/Acoes.vue';

import ProcessosPorNivel from './src/components/listas/ProcessosPorNivel.vue';
import AmeacasAosProcessos from './src/components/listas/AmeacasAosProcessos.vue';
import EventosPorData from './src/components/listas/EventosPorData.vue';
import EventosPorAmeaca from './src/components/listas/EventosPorAmeaca.vue';
import EventosPorProcesso from './src/components/listas/EventosPorProcesso.vue';
import MapaRiscos from './src/components/listas/MapaRiscos.vue';

export const routes = [{
    path: '/login',
    name: 'login',
    component: Login
}, {
    path: '',
    name: 'home',
    component: Home,
    redirect: '/mapa-riscos',
    children: [{
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
    }, {
        path: '/usuarios',
        component: Usuarios
    }, {
        path: '/processos-por-nivel-criticidade',
        component: ProcessosPorNivel
    }, {
        path: '/ameacas-aos-processos',
        component: AmeacasAosProcessos
    }, {
        path: '/eventos-por-data',
        component: EventosPorData
    }, {
        path: '/eventos-por-ameaca',
        component: EventosPorAmeaca
    }, {
        path: '/eventos-por-processo',
        component: EventosPorProcesso
    }, {
        path: '/mapa-riscos',
        component: MapaRiscos
    }]
}];