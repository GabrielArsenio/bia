<template>
    <v-dialog v-model="isOpen" max-width="500px">
        <v-card>
            <v-card-title class="grey lighten-4 py-4 title">
                Novo indicativo de ação
            </v-card-title>
            <v-container grid-list-sm class="pa-4">
                <v-layout row wrap>

                    <v-flex xs3>
                        <v-text-field v-model="document._id" disabled label="Código"></v-text-field>
                    </v-flex>

                    <v-flex xs12>
                        <v-select 
                            :items="processos" 
                            v-model="tempDocument.processo"
                            label="Processo" 
                            item-text="descricao" 
                            item-value="_id" 
                            autocomplete
                        ></v-select>
                    </v-flex>

                    <v-flex xs12>
                        <v-select 
                            :items="ameacas" 
                            v-model="tempDocument.ameaca"
                            label="Ameaças" 
                            item-text="descricao" 
                            item-value="_id" 
                            autocomplete
                        ></v-select>
                    </v-flex>

                    <v-flex xs12>
                        <v-text-field v-model="tempDocument.procedimento" label="Procedimento"></v-text-field>
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
                tempDocument: {},
                processos: [],
                ameacas: []
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

                    if (this.tempDocument.processo) {
                        this.tempDocument.processo = this.tempDocument.processo._id
                    }

                    if (this.tempDocument.ameaca) {
                        this.tempDocument.ameaca = this.tempDocument.ameaca._id
                    }

                    this.getProcessos()
                    this.getAmeacas()
                }
            }
        },
        methods: {
            cancel() {
                this.$emit('cancel')
            },
            save() {
                new Service(this.$resource('api/acoes{/id}'))
                    .save(this.tempDocument)
                    .then((res) => {
                        let selectedProcesso = this.processos.find(processo => processo._id === this.tempDocument.processo);
                        this.tempDocument.processo = selectedProcesso;
console.log(this.tempDocument.processo)
                        let selectedAmeaca = this.ameacas.find(ameaca => ameaca._id === this.tempDocument.ameaca);
                        this.tempDocument.ameaca = selectedAmeaca;

                        this.$emit('save', res.body || this.tempDocument)
                    }, err => console.log(err))
            },
            getProcessos() {
                new Service(this.$resource('api/processos{/id}'))
                    .findAll()
                    .then(processos => this.processos = processos);
            },
            getAmeacas() {
                new Service(this.$resource('api/ameacas{/id}'))
                    .findAll()
                    .then(ameacas => this.ameacas = ameacas);
            }
        }
    }
</script>