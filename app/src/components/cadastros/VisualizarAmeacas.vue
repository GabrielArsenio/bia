<template>
    <v-dialog v-model="isOpen" max-width="500px" persistent>
        <v-card>
            <v-card-title class="grey lighten-4 py-4 title">
                Visualizar ameaças
                <v-spacer></v-spacer>
                <v-btn flat icon color="red" @click="$emit('close')">
                    <v-icon>close</v-icon>
                </v-btn>
            </v-card-title>

            <v-container grid-list-lg>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-data-table hide-actions fix-header :headers="headers" :items="acoes">
                            <template slot="items" slot-scope="props">
                                <td>{{ props.item.ameaca.descricao }}</td>
                                <td>{{ props.item.procedimento }}</td>
                            </template>
                        </v-data-table>
                    </v-flex>
                </v-layout>
            </v-container>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat @click="$emit('close')">Fechar</v-btn>
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
                headers: [
                    { text: 'Ameaça', value: 'descricao' },
                    { text: 'Indicativo de ação', value: 'descricao' }
                ],
                acoes: [],
                tempDocument: { 
                    acao:{
                        processo: { nivel: {} },
                        ameaca: {}
                    }
                } 
            }
        },
        watch: {
            document: function(newVal) {
                this.isOpen = !!newVal

                if (!this.document) {
                    return
                }

                this.tempDocument = Object.assign({}, newVal)
                this.loadAmeacas();
            }
        },
        methods: {
            loadAmeacas() {
                this.service = new Service(this.$resource('api/acoes{/id}'));

                this.service
                    .findAll()
                    .then(items => {
                        this.acoes = items.filter(item => item.processo._id === this.tempDocument._id)
                    });
            }
        }
    }
</script>