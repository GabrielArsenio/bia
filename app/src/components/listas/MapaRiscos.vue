<template>
    <div>
        <v-toolbar flat color="white">
            <v-toolbar-title>Mapa de riscos</v-toolbar-title>
        </v-toolbar>

        <v-data-table hide-actions :headers="headers" :items="items">
            <template slot="items" slot-scope="props">
                <td>{{ props.item.descricao }}</td>
                <td>{{ props.item.nivel && props.item.nivel.descricao }}</td>
                <td>{{ props.item.tolerancia }}</td>
                <td>
                    <v-btn icon class="mx-0" @click="viewItem(props.item)">
                        <v-icon color="blue">bug_report</v-icon>
                    </v-btn>
                </td>
            </template>
        </v-data-table>

        <VisualizarAmeacas
            :document="visualizarAmeacas"
            @close="visualizarAmeacas = null"
        ></VisualizarAmeacas>
    </div>
</template>

<script>
    import { Service } from '../../domain/Service'
    import DialogConfirmRemove from '../shared/DialogConfirmRemove'
    import VisualizarAmeacas from '../cadastros/VisualizarAmeacas'

    export default {
        name: 'MapaRiscos',
        components: {
            DialogConfirmRemove,
            VisualizarAmeacas
        },
        data() {
            return {
                visualizarAmeacas: null,
                headers: [
                    { text: 'Processo', value: 'descricao' },
                    { text: 'Nível', value: 'nivel.descricao' },
                    { text: 'Tolerância', value: 'tolerancia' },
                    { text: 'Ameaças', value: 'descricao', sortable: false }
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