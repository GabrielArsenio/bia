import { createRouter, createWebHistory } from 'vue-router';
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

const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '',
        name: 'home',
        component: Home,
        // redirect: '/mapa-riscos',
        children: [
            {
                path: '/ameacas',
                name: 'ameacas', // Added name for consistency, can be useful
                component: Ameacas
            },
            {
                path: '/processos',
                name: 'processos', // Added name
                component: Processos
            },
            {
                path: '/niveis',
                name: 'niveis', // Added name
                component: Niveis
            },
            {
                path: '/acoes',
                name: 'acoes', // Added name
                component: Acoes
            },
            {
                path: '/usuarios',
                name: 'usuarios', // Added name
                component: Usuarios
            },
            {
                path: '/processos-por-nivel-criticidade',
                name: 'processosPorNivel', // Added name
                component: ProcessosPorNivel
            },
            {
                path: '/ameacas-aos-processos',
                name: 'ameacasAosProcessos', // Added name
                component: AmeacasAosProcessos
            },
            {
                path: '/eventos-por-data',
                name: 'eventosPorData', // Added name
                component: EventosPorData
            },
            {
                path: '/eventos-por-ameaca',
                name: 'eventosPorAmeaca', // Added name
                component: EventosPorAmeaca
            },
            {
                path: '/eventos-por-processo',
                name: 'eventosPorProcesso', // Added name
                component: EventosPorProcesso
            },
            {
                path: '/mapa-riscos',
                name: 'mapaRiscos', // Added name
                component: MapaRiscos
            }
        ]
    }
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});