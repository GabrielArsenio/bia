<template>
    <v-dialog v-model="isOpen" max-width="500px">
        <v-card>
            <v-card-title class="grey lighten-4 py-4 title">
                {{ tempDocument._id ? 'Editar' : 'Nova' }} ameaça
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

                    <v-flex xs12>
                        <v-text-field
                            label="Descrição"
                            v-model="tempDocument.descricao"
                            name="descricao"
                            v-validate="'required'"
                            :error="errors.has('descricao')"
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
                tempDocument: {}
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
                }
            }
        },
        methods: {
            cancel() {
                this.$emit('cancel')
            },
            save() {
                new Service(this.$resource('api/ameacas{/id}'))
                    .save(this.tempDocument)
                    .then((res) => {
                        this.$emit('save', res.body || this.tempDocument)
                    }, err => console.log(err))
            }
        }
    }
</script>