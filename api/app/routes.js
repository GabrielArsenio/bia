import Home from './src/components/Home.vue';
import Ameacas from './src/components/listas/Ameacas.vue';

export const routes = [{
    path: '',
    component: Home,
    children: [{
        path: '/ameacas',
        component: Ameacas
    }]
}];