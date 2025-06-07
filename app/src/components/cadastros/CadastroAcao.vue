<template>
    <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ handleSubmit }">
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
                <v-container class="pa-4"> <!-- Removed grid-list-sm -->
                    <v-row>

                        <v-col cols="3"> <!-- Replaced v-flex xs3 -->
                            <v-text-field label="Código" v-model="form._id" disabled></v-text-field>
                        </v-col>

                        <v-col cols="12"> <!-- Replaced v-flex xs12 -->
                            <Field name="processo" v-model="form.processo" v-slot="{ field, errors }">
                                <v-autocomplete
                                    label="Processo"
                                    v-bind="field"
                                    :items="processos"
                                    item-text="descricao"
                                    item-value="_id"
                                    :error-messages="errors"
                                ></v-autocomplete>
                            </Field>
                            <ErrorMessage name="processo" class="red--text text--darken-1 caption"/>
                        </v-col>

                        <v-col cols="12"> <!-- Replaced v-flex xs12 -->
                            <Field name="ameaca" v-model="form.ameaca" v-slot="{ field, errors }">
                                <v-autocomplete
                                    label="Ameaças"
                                    v-bind="field"
                                    :items="ameacas"
                                    item-text="descricao"
                                    item-value="_id"
                                    :error-messages="errors"
                                ></v-autocomplete>
                            </Field>
                            <ErrorMessage name="ameaca" class="red--text text--darken-1 caption"/>
                        </v-col>

                        <v-col cols="12"> <!-- Replaced v-flex xs12 -->
                            <Field name="procedimento" v-model="form.procedimento" v-slot="{ field, errors }">
                                <v-textarea
                                    label="Procedimento"
                                    v-bind="field"
                                    :error-messages="errors"
                                ></v-textarea>
                            </Field>
                            <ErrorMessage name="procedimento" class="red--text text--darken-1 caption"/>
                        </v-col>
                    </v-row> <!-- Closed v-row -->
                </v-container>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="cancel()">Cancelar</v-btn>
                    <v-btn color="primary" @click="handleSubmit">Salvar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </Form>
</template>

<script>
import { Service } from '../../domain/Service';
import CrudFormMixin from '../../mixins/crud-form.mixin';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

export default {
    mixins: [CrudFormMixin],
    components: {
        Form,
        Field,
        ErrorMessage
    },
    props: {
        document: {
            required: true
        }
    },
    data() {
        const schema = yup.object({
            processo: yup.string().required('O processo é obrigatório.'),
            ameaca: yup.string().required('A ameaça é obrigatória.'),
            procedimento: yup.string().required('O procedimento é obrigatório.'),
        });
        return {
            processos: [],
            ameacas: [],
            schema
        };
    },
    methods: {
        onSubmit() {
            this.save(); // Calls save from CrudFormMixin
        }
    },
    created() {
        this.service = new Service('api/acoes');
        this.serviceProcessos = new Service('api/processos');
        this.serviceAmeacas = new Service('api/ameacas');
    },
    async mounted() {
        this.processos = await this.serviceProcessos.findAll();
        this.ameacas = await this.serviceAmeacas.findAll();
    }
}
</script>