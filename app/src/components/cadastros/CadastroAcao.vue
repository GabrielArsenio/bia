<template>
    <v-dialog v-model="isOpen" max-width="500px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" class="mb-2" v-bind="attrs" v-on="on">
                Nova ação
            </v-btn>
        </template>
        <v-card>
            <v-card-title class="grey lighten-4 py-4 title">
                {{ form._id ? 'Editar' : 'Novo' }} indicativo de ação
            </v-card-title>
            <v-container grid-list-sm class="pa-4">
                <v-layout row wrap>

                    <v-flex xs3>
                        <v-text-field label="Código" v-model="form._id" disabled></v-text-field>
                    </v-flex>

                    <v-flex xs12>
                        <v-autocomplete label="Processo" v-model="form.processo" :items="processos"
                            item-text="descricao" item-value="_id"></v-autocomplete>
                    </v-flex>

                    <v-flex xs12>
                        <v-autocomplete label="Ameaças" v-model="form.ameaca" :items="ameacas" item-text="descricao"
                            item-value="_id"></v-autocomplete>
                    </v-flex>

                    <v-flex xs12>
                        <v-textarea label="Procedimento" v-model="form.procedimento"></v-textarea>
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
    data() {
        return {
            processos: [],
            ameacas: []
        }
    },
    created() {
        this.service = new Service(this.$resource('api/acoes{/id}'))
        this.serviceProcessos = new Service(this.$resource('api/processos{/id}'))
        this.serviceAmeacas = new Service(this.$resource('api/ameacas{/id}'))
    },
    async mounted() {
        this.processos = await this.serviceProcessos.findAll();
        this.ameacas = await this.serviceAmeacas.findAll();
    }
}
</script>