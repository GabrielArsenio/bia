<template>
    <div>
        <v-toolbar flat color="white">
            <v-toolbar-title>Eventos por processo</v-toolbar-title>
        </v-toolbar>

        <v-container>
            <v-layout row wrap>
                <v-flex xs2>
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
                        <v-text-field
                            label="Data inicial"
                            slot="activator"
                            v-model="dateFormatted"
                            persistent-hint
                            prepend-icon="event"
                            @blur="date = parseDate(dateFormatted)"
                        ></v-text-field>
                        <v-date-picker
                            v-model="date"
                            no-title
                            @input="menu1 = false"
                            locale="pt-br"
                        ></v-date-picker>
                    </v-menu>
                </v-flex>

                <v-flex xs2>
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
                        <v-text-field
                            label="Data final"
                            slot="activator"
                            v-model="dateFormatted2"
                            persistent-hint
                            prepend-icon="event"
                            @blur="date2 = parseDate(dateFormatted2)"
                        ></v-text-field>
                        <v-date-picker
                            v-model="date2"
                            no-title
                            @input="menu2 = false"
                            locale="pt-br"
                        ></v-date-picker>
                    </v-menu>
                </v-flex>

                <v-flex xs8></v-flex>

                <v-flex xs7>
                    <v-autocomplete 
                        label="Processo" 
                        :items="processos" 
                        v-model="processo"
                        item-text="descricao" 
                        item-value="_id" 
                    ></v-autocomplete>
                </v-flex>
            </v-layout>
        </v-container>

        <v-data-table hide-actions fix-header :headers="headers" :items="items">
            <template slot="items" slot-scope="props">
                <td>{{ formatDate(props.item.data)  }}</td>
                <td>{{ props.item.acao.ameaca.descricao }}</td>
                <td>
                    <v-btn icon class="mx-0" @click="viewItem(props.item)">
                        <v-icon color="blue">visibility</v-icon>
                    </v-btn>
                </td>
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
                headers: [
                    { text: 'Data', value: 'data' },
                    { text: 'Ameaça', value: 'acao.ameaca.descricao' },
                    { text: 'Visualizar', value: 'acao.ameaca.descricao', sortable: false }
                ],
                items: [],
                processos: [],
                processo: {}
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
            processo(val) {
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
                            return typeof this.processo === 'string' ? item.acao.processo._id === this.processo: true
                        })
                    });
            },
            loadProcessos() {
                new Service(this.$resource('api/processos{/id}'))
                    .findAll()
                    .then(processos => this.processos = processos);
            }
        },
        created() {
            this.service = new Service(this.$resource('api/eventos-por-data'));
            this.loadItens();
            this.loadProcessos();
        }
    }
</script>