<template>
    <v-dialog v-model="isOpen" max-width="500px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" class="mb-2" v-bind="attrs" v-on="on">
                Novo nível
            </v-btn>
        </template>
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
                <v-btn @click="cancel()">Cancelar</v-btn>
                <v-btn color="primary" @click="save()">Salvar</v-btn>
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
            this.isOpen = false;
        },
        save() {
            new Service(this.$resource('api/niveis{/id}'))
                .save(this.tempDocument)
                .then(res => this.$emit('save', res.body || this.tempDocument))
            this.isOpen = false;
        }
    }
}
</script>