<template>
    <v-dialog v-model="document" max-width="500px">
        <v-card>
            <v-card-title class="grey lighten-4 py-4 title">
                {{ tempDocument._id ? 'Editar' : 'Novo' }} nível de criticidade
            </v-card-title>
            <v-container grid-list-sm class="pa-4">
                <v-layout row wrap>
                    <v-flex xs3>
                        <v-text-field v-model="tempDocument._id" disabled label="Código"></v-text-field>
                    </v-flex>

                    <v-flex xs12>
                        <v-text-field v-model="tempDocument.descricao" label="Descrição"></v-text-field>
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
    import Nivel from '../../domain/Nivel'

    export default {
        props: {
            document: {
                required: true
            }
        },
        data() {
            return {
                tempDocument: {}
            }
        },
        watch: {
            document: function (newVal, oldVal) {
                if (typeof this.document === 'object') {
                    this.tempDocument = Object.assign({}, this.document)
                }
            }
        },
        methods: {
            cancel() {
                this.$emit('cancel')
            },
            save() {
                new Service(this.$resource('api/niveis{/id}'))
                    .save(this.tempDocument)
                    .then((res) => {
                        this.$emit('save', res.body || this.tempDocument)
                    }, err => console.log(err))
            }
        }
    }
</script>