<template>
    <v-dialog v-model="isOpen" max-width="500px" persistent>
        <v-card>
            <v-card-title class="grey lighten-4 py-4 title">
                Visualizar
                <v-spacer></v-spacer>
                <v-btn variant="text" icon color="red" @click="$emit('close')"> <!-- Replaced flat with variant="text" -->
                    <v-icon>close</v-icon>
                </v-btn>
            </v-card-title>

                <v-container class="pa-4"> <!-- Removed grid-list-lg -->
                    <v-row> <!-- Replaced v-layout -->
                        <v-col cols="3"> <!-- Replaced v-flex xs3 -->
                            <v-text-field
                                label="Data"
                                v-model="tempDocument.data"
                                readonly 
                            ></v-text-field>
                        </v-col>

                        <v-col cols="3"> <!-- Replaced v-flex xs3 -->
                            <v-text-field
                                label="Hora"
                                v-model="tempDocument.hora"
                                readonly 
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12"> <!-- Replaced v-flex xs12 -->
                            <v-text-field
                                label="Processo"
                                v-model="tempDocument.acao.processo.descricao"
                                readonly 
                            ></v-text-field>
                        </v-col>

                        <v-col cols="6"> <!-- Replaced v-flex xs6 -->
                            <v-text-field
                                label="Nível"
                                v-model="tempDocument.acao.processo.nivel.descricao"
                                readonly 
                            ></v-text-field>
                        </v-col>

                        <v-col cols="6"> <!-- Replaced v-flex xs6 -->
                            <v-text-field
                                label="Tolerância"
                                v-model="tempDocument.acao.processo.tolerancia"
                                readonly 
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12"> <!-- Replaced v-flex xs12 -->
                            <v-text-field
                                label="Ameaça"
                                v-model="tempDocument.acao.ameaca.descricao"
                                readonly 
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12"> <!-- Replaced v-flex xs12 -->
                            <v-textarea
                                label="Procedimento"
                                v-model="tempDocument.acao.procedimento"
                                readonly 
                            ></v-textarea>
                        </v-col>

                        <v-col cols="12"> <!-- Replaced v-flex xs12 -->
                            <v-text-field
                                label="Descrição do evento"
                                v-model="tempDocument.descricao"
                                readonly 
                            ></v-text-field>
                        </v-col>
                    </v-row> <!-- Closed v-row -->
                </v-container>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn variant="text" @click="$emit('close')">Fechar</v-btn> <!-- Replaced flat with variant="text" -->
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

                const [ano, mes, dia] = this.document.data.split('T')[0].split('-')

                this.tempDocument.data = `${dia}/${mes}/${ano}`
            }
        }
    }
</script>