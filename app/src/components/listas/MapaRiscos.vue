<template>
    <v-container fluid>

        <v-data-table hide-default-footer fix-header :headers="headers" :items="items">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Mapa de riscos</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                </v-toolbar>
            </template>

            <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="viewItem(item)">
                    bug_report
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
            headers: [
                { text: 'Processo', value: 'descricao' },
                { text: 'Nível', value: 'nivel.descricao' },
                { text: 'Tolerância', value: 'tolerancia' },
                { text: 'Ameaças', value: 'actions', sortable: false, align: 'center' }
            ],
            items: []
        }
    },
    created() {
        this.service = new Service(this.$resource('api/processos{/id}'));

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