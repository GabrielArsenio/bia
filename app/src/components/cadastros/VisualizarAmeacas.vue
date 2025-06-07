<template>
    <v-dialog v-model="isOpen" max-width="500px" persistent>
        <v-card>
            <v-card-title class="grey lighten-4 py-4 title">
                Visualizar ameaças
                <v-spacer></v-spacer>
                <v-btn icon color="red" @click="$emit('close')">
                    <v-icon>close</v-icon>
                </v-btn>
            </v-card-title>

            <v-container> <!-- Removed grid-list-lg -->
                <v-row> <!-- Replaced v-layout -->
                    <v-col cols="12"> <!-- Replaced v-flex xs12 -->
                        <v-data-table hide-default-footer fix-header :headers="headers" :items="acoes">
                        </v-data-table>
                    </v-col>
                </v-row> <!-- Closed v-row -->
            </v-container>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="$emit('close')">Fechar</v-btn>
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
                { text: 'Ameaça', value: 'ameaca.descricao' },
                { text: 'Indicativo de ação', value: 'procedimento' }
            ],
            acoes: [],
            tempDocument: {
                acao: {
                    processo: { nivel: {} },
                    ameaca: {}
                }
            }
        }
    },
    watch: {
        document: function (newVal) {
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
            this.service = new Service('api/acoes');

            this.service
                .findAll()
                .then(items => {
                    this.acoes = items.filter(item => item.processo._id === this.tempDocument._id)
                });
        }
    }
}
</script>