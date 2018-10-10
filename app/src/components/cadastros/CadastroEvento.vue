<template>
    <v-dialog v-model="isOpen" max-width="500px" persistent>
        <v-card>
            <v-card-title class="grey lighten-4 py-4 title">
                Evento
            </v-card-title>
            <v-container grid-list-sm class="pa-4">
                <v-layout row wrap>
                    <v-flex xs6 lg6>
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
                                label="Data"
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

                    <v-flex xs6 sm5>
                        <v-menu
                            ref="menu"
                            :close-on-content-click="false"
                            v-model="menu2"
                            :nudge-right="40"
                            :return-value.sync="time"
                            lazy
                            transition="scale-transition"
                            offset-y
                            full-width
                            max-width="290px"
                            min-width="290px"
                        >
                            <v-text-field
                                label="Hora"
                                slot="activator"
                                v-model="time"
                                prepend-icon="access_time"
                                readonly
                            ></v-text-field>
                            <v-time-picker
                                v-if="menu2"
                                v-model="time"
                                format="24hr"
                                @change="$refs.menu.save(time)"
                            ></v-time-picker>
                        </v-menu>
                    </v-flex>

                    <v-flex xs12>
                        <v-text-field 
                            label="Processo"
                            :value="tempDocument.acao.processo.descricao"
                            readonly
                        ></v-text-field>
                    </v-flex>

                    <v-flex xs12>
                        <v-text-field 
                            label="Ameaça"
                            :value="tempDocument.acao.ameaca.descricao"
                            readonly
                        ></v-text-field>
                    </v-flex>

                    <v-flex xs12>
                        <v-textarea 
                            label="Procedimento"
                            :value="tempDocument.acao.procedimento"
                            readonly
                        ></v-textarea>
                    </v-flex>

                    <v-flex xs12>
                        <v-text-field
                            label="Descrição"
                            v-model="tempDocument.descricao"
                        ></v-text-field>
                    </v-flex>
                </v-layout>
            </v-container>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat @click="cancel()">Cancelar</v-btn>
                <v-btn flat color="primary" @click="save()">Salvar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import { Service } from '../../domain/Service'

    export default {
        props: {
            document: {
                required: true
            }
        },
        data() {
            return {
                isOpen: false,
                tempDocument: {
                    acao: {
                        processo: {
                            descricao: ''
                        },
                        ameaca: {
                            descricao: ''
                        }
                    }
                },
                acoes: [],
                menu1: false,
                dateFormatted: null,
                date: null,
                time: null,
                menu2: false,
            }
        },
        computed: {
            computedDateFormatted () {
                return this.formatDate(this.date)
            },
            dataHoraFormatted () {
                if (!this.tempDocument.dataHora) {
                    return null
                }

                const dataHora = this.tempDocument.dataHora

                const [day, month, year, hour, minute] = [
                    dataHora.getDate(),
                    dataHora.getMonth() + 1,
                    dataHora.getFullYear(),
                    dataHora.getHours(),
                    dataHora.getMinutes()
                ];                

                return `${day}/${month}/${year} ${hour}:${minute}`
            }
        },
        watch: {
            document: function (newVal, oldVal) {
                if (!this.document) {
                    this.isOpen = false;
                }

                if (typeof this.document === 'object') {
                    this.isOpen = true
                    this.tempDocument = Object.assign({}, this.document)

                    this.tempDocument.dataHora = new Date()
                }
            },
            date (val) {
                this.dateFormatted = this.formatDate(this.date)
            }
        },
        methods: {
            formatDate (date) {
                if (!date) return null

                const [year, month, day] = date.split('-')
                return `${month}/${day}/${year}`
            },
            parseDate (date) {
                if (!date) return null

                const [month, day, year] = date.split('/')
                return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
            },
            cancel() {
                this.$emit('cancel')
            },
            save() {
                this.tempDocument.data = this.date
                this.tempDocument.hora = this.time

                new Service(this.$resource('api/eventos{/id}'))
                    .save(this.tempDocument)
                    .then(res => this.$emit('save', res.body || this.tempDocument))
            }
        }
    }
</script>