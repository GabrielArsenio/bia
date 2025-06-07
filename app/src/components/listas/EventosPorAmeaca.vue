<template>
    <div>
        <v-toolbar variant="flat" color="white"> <!-- Replaced flat -->
            <v-toolbar-title>Eventos por ameaça</v-toolbar-title>
        </v-toolbar>

        <v-container>
            <v-row> <!-- Replaced v-layout -->
                <v-col cols="2"> <!-- Replaced v-flex xs2 -->
                    <v-menu
                        ref="menu1"
                        :close-on-content-click="false"
                        v-model="menu1"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        max-width="290px"
                        min-width="290px"
                    >
                        <template v-slot:activator="{ props: menuActivatorProps1 }">
                            <v-text-field
                                label="Data inicial"
                                v-bind="menuActivatorProps1"
                                v-model="dateFormatted"
                                persistent-hint
                                prepend-icon="event"
                                @blur="date = parseDate(dateFormatted)"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="date"
                            no-title
                            @input="menu1 = false"
                            locale="pt-br"
                        ></v-date-picker>
                    </v-menu>
                </v-col>

                <v-col cols="2"> <!-- Replaced v-flex xs2 -->
                    <v-menu
                        ref="menu2"
                        :close-on-content-click="false"
                        v-model="menu2"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        max-width="290px"
                        min-width="290px"
                    >
                        <template v-slot:activator="{ props: menuActivatorProps2 }">
                            <v-text-field
                                label="Data final"
                                v-bind="menuActivatorProps2"
                                v-model="dateFormatted2"
                                persistent-hint
                                prepend-icon="event"
                                @blur="date2 = parseDate(dateFormatted2)"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="date2"
                            no-title
                            @input="menu2 = false"
                            locale="pt-br"
                        ></v-date-picker>
                    </v-menu>
                </v-col>

                <v-col cols="8"> <!-- Replaced v-flex xs8 --></v-col>

                <v-col cols="7"> <!-- Replaced v-flex xs7 -->
                    <v-autocomplete 
                        label="Ameaça" 
                        :items="ameacas" 
                        v-model="ameaca"
                        item-text="descricao" 
                        item-value="_id" 
                    ></v-autocomplete>
                </v-col>
            </v-row> <!-- Closed v-row -->
        </v-container>

        <v-data-table :hide-default-footer="true" :fixed-header="true" :headers="headers" :items="items"> <!-- hide-actions to hide-default-footer, fix-header to fixed-header -->
            <template v-slot:item="{ item }"> <!-- Updated slot syntax -->
                <tr> <!-- Added <tr> wrapper for direct <td> usage in item slot -->
                    <td>{{ formatDate(item.raw.data) }}</td>
                    <td>{{ item.raw.acao.processo.descricao }}</td>
                    <td>
                        <v-btn icon class="mx-0" @click="viewItem(item.raw)">
                            <v-icon color="blue">mdi-eye</v-icon> <!-- MDI icon name -->
                        </v-btn>
                    </td>
                </tr>
            </template>
        </v-data-table>

        <VisualizarEvento
            :document="visualizarMais"
            @close="visualizarMais = null"
        ></VisualizarEvento>

    </div>
</template>

<script>
    import { Service } from '../../domain/Service'
    import VisualizarEvento from '../cadastros/VisualizarEvento'

    export default {
        name: 'ProcessosPorNivel',
        components: {
            VisualizarEvento
        },
        data() {
            return {
                visualizarMais: null,
                menu1: false,
                dateFormatted: null,
                date: null,
                menu2: false,
                dateFormatted2: null,
                date2: null,
                headers: [ // text -> title, value -> key
                    { title: 'Data', key: 'data' }, // Assuming 'data' is a direct property after formatting, or use a custom key if formatting is done in item slot
                    { title: 'Processo', key: 'acao.processo.descricao' },
                    { title: 'Visualizar', key: 'actions', sortable: false } // Changed value to 'actions' for clarity if it's not a data property
                ],
                items: [],
                ameacas: [],
                ameaca: {}
            }
        },
        watch: {
            date (val) {
                this.dateFormatted = this.formatDate(this.date);
                this.loadItens({ dataInicial: this.date, dataFinal: this.date2 });
            },
            date2 (val) {
                this.dateFormatted2 = this.formatDate(this.date2);
                this.loadItens({ dataInicial: this.date, dataFinal: this.date2 });
            },
            ameaca(val) {
                this.loadItens({ dataInicial: this.date, dataFinal: this.date2 });
            }
        },
        methods: {
            viewItem(item) {
                this.visualizarMais = item
            },
            formatDate (date) {
                if (!date) return null

                const [year, month, day] = date.split('T')[0].split('-')
                return `${day}/${month}/${year}`
            },
            parseDate (date) {
                if (!date) return null

                const [day, month, year] = date.split('/')
                return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
            },
            loadItens (queryParams) {
                this.service
                    .findAll(queryParams)
                    .then(items => {
                        this.items = items.filter(item => {
                            return typeof this.ameaca === 'string' ? item.acao.ameaca._id === this.ameaca: true
                        })
                    });
            },
            loadAmeacas() {
                new Service('api/ameacas')
                    .findAll()
                    .then(ameacas => this.ameacas = ameacas);
            }
        },
        created() {
            this.service = new Service('api/eventos-por-data');
            this.loadItens();
            this.loadAmeacas();
        }
    }
</script>