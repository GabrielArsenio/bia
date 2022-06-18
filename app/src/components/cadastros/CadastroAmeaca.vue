<template>
    <v-dialog v-model="isOpen" max-width="500px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" class="mb-2" v-bind="attrs" v-on="on">
                Nova ameaça
            </v-btn>
        </template>
        <v-card>
            <v-card-title class="grey lighten-4 py-4 title">
                {{ form._id ? 'Editar' : 'Nova' }} ameaça
            </v-card-title>
            <v-container grid-list-sm class="pa-4">
                <v-layout row wrap>
                    <v-flex xs3>
                        <v-text-field label="Código" v-model="form._id" disabled></v-text-field>
                    </v-flex>

                    <v-flex xs12>
                        <v-text-field label="Descrição" v-model="form.descricao" name="descricao"
                            v-validate="'required'" :error="errors.has('descricao')"></v-text-field>
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
import CrudFormMixin from '../../mixins/crud-form.mixin';

export default {
    mixins: [CrudFormMixin],
    props: {
        document: {
            required: true
        }
    },
    created() {
        this.service = new Service(this.$resource('api/ameacas{/id}'))
    }
}
</script>