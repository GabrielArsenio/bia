<template>
    <v-dialog v-model="isOpen" max-width="500px">
        <v-card>
            <v-card-title class="grey lighten-4 py-4 title">
                Evento
            </v-card-title>
            <v-container grid-list-sm class="pa-4">
                <v-layout row wrap>
                    <v-flex xs3>
                        <v-text-field 
                            label="Código"
                            v-model="tempDocument._id"
                            disabled
                        ></v-text-field>
                    </v-flex>

                    <v-flex xs6>
                        <v-menu
                            ref="menu"
                            :close-on-content-click="false"
                            v-model="menu"
                            :nudge-right="40"
                            :return-value.sync="tempDocument.data"
                            lazy
                            transition="scale-transition"
                            offset-y
                            full-width
                            min-width="290px"
                        >
                            <v-text-field
                                label="Data"
                                slot="activator"
                                v-model="tempDocument.data"
                                prepend-icon="event"
                                readonly
                            ></v-text-field>
                            <v-date-picker v-model="tempDocument.data" no-title scrollable>
                                <v-spacer></v-spacer>
                                <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                                <v-btn flat color="primary" @click="$refs.menu.save(tempDocument.data)">OK</v-btn>
                            </v-date-picker>
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
                menu: false,
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
                acoes: []
            }
        },
        computed: {
            dataHoraFormatted () {
                if (!this.tempDocument.data) {
                    return null
                }

                const data = this.tempDocument.data

                const [day, month, year, hour, minute] = [
                    data.getDate(),
                    data.getMonth() + 1,
                    data.getFullYear(),
                    data.getHours(),
                    data.getMinutes()
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

                this.getAcoes()
            }
        },
        methods: {
            cancel() {
                this.$emit('cancel')
            },
            save() {
                new Service(this.$resource('api/eventos{/id}'))
                    .save(this.tempDocument)
                    .then((res) => {
                        this.$emit('save', res.body || this.tempDocument)
                    }, err => console.log(err))
            },
            getAcoes() {
                new Service(this.$resource('api/acoes{/id}'))
                    .findAll()
                    .then(acoes => this.acoes = acoes);
            }
        }
    }
</script>