<template>
    <div>
        <v-toolbar flat color="white">
            <v-toolbar-title>Eventos por data</v-toolbar-title>
        </v-toolbar>

        <v-layout row wrap>

            <v-flex xs2 sm2 md2>
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

            <v-flex xs2 sm2 md2>
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
        </v-layout>

        <v-data-table hide-actions fix-header :headers="headers" :items="items">
            <template slot="items" slot-scope="props">
                <td>{{ !!props.item.data ? new Date(props.item.data).toLocaleDateString() : ''  }}</td>
                <td>{{ props.item.acao.processo.descricao }}</td>
                <td>{{ props.item.acao.ameaca.descricao }}</td>
            </template>
        </v-data-table>

    </div>
</template>

<script>
    import { Service } from '../../domain/Service'

    export default {
        name: 'ProcessosPorNivel',
        data() {
            return {
                menu1: false,
                dateFormatted: null,
                date: null,
                menu2: false,
                dateFormatted2: null,
                date2: null,
                headers: [
                    { text: 'Data', value: 'data' },
                    { text: 'Processo', value: 'acao.processo.descricao' },
                    { text: 'Ameaça', value: 'acao.ameaca.descricao' }
                ],
                items: []
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
            }
        },
        methods: {
            formatDate (date) {
                if (!date) return null

                const [year, month, day] = date.split('-')
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
                    .then(items => this.items = items);
            }
        },
        created() {
            this.service = new Service(this.$resource('api/eventos-por-data'));
            this.loadItens();
        }
    }
</script>