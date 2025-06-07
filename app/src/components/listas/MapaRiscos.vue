<template>
    <v-container fluid>

        <v-data-table :hide-default-footer="true" :fixed-header="true" :headers="headers" :items="items"> <!-- V3 props -->
            <template v-slot:top>
                <v-toolbar variant="flat"> <!-- V3 prop -->
                    <v-toolbar-title>Mapa de riscos</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                </v-toolbar>
            </template>

            <template v-slot:item.actions="{ item }"> <!-- V3 slot, item.raw if needed -->
                <v-icon size="small" class="mr-2" @click="viewItem(item.raw || item)">
                    mdi-bug <!-- MDI icon -->
                </v-icon>
            </template>
        </v-data-table>

        <VisualizarAmeacas :document="visualizarAmeacas" @close="visualizarAmeacas = null"></VisualizarAmeacas>
    </v-container>
</template>

<script>
import { Service } from '../../domain/Service'
import VisualizarAmeacas from '../cadastros/VisualizarAmeacas'

export default {
    name: 'MapaRiscos',
    components: {
        VisualizarAmeacas
    },
    data() {
        return {
            visualizarAmeacas: null,
            headers: [ // text -> title, value -> key
                { title: 'Processo', key: 'descricao' },
                { title: 'Nível', key: 'nivel.descricao' },
                { title: 'Tolerância', key: 'tolerancia' },
                { title: 'Ameaças', key: 'actions', sortable: false, align: 'center' }
            ],
            items: []
        }
    },
    created() {
        this.service = new Service('api/processos');

        this.service
            .findAll()
            .then(items => this.items = items);
    },
    methods: {
        viewItem(item) {
            this.visualizarAmeacas = item
        }
    }
}
</script>