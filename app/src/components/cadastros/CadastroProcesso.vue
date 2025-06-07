<template>
    <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ handleSubmit }">
        <v-dialog v-model="isOpen" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" class="mb-2" v-bind="attrs" v-on="on">
                    Novo processo
                </v-btn>
            </template>
            <v-card>
                <v-card-title class="grey lighten-4 py-4 title">
                    {{ form._id ? 'Editar' : 'Novo' }} processo
                </v-card-title>
                <v-container class="pa-4"> <!-- Removed grid-list-sm -->
                    <v-row> <!-- Replaced v-layout -->
                        <v-col cols="3"> <!-- Replaced v-flex xs3 -->
                            <v-text-field v-model="form._id" disabled label="Código"></v-text-field>
                        </v-col>

                        <v-col cols="12"> <!-- Replaced v-flex xs12 -->
                            <Field name="descricao" v-model="form.descricao" v-slot="{ field, errors }">
                                <v-text-field
                                    v-bind="field"
                                    label="Descrição"
                                    :error-messages="errors"
                                ></v-text-field>
                            </Field>
                            <ErrorMessage name="descricao" class="red--text text--darken-1 caption"/>
                        </v-col>

                        <v-col cols="12"> <!-- Replaced v-flex xs12 -->
                            <Field name="nivel" v-model="form.nivel" v-slot="{ field, errors }">
                                <v-autocomplete
                                    v-bind="field"
                                    :items="niveis"
                                    label="Nível"
                                    item-text="descricao"
                                    item-value="_id"
                                    :error-messages="errors"
                                ></v-autocomplete>
                            </Field>
                            <ErrorMessage name="nivel" class="red--text text--darken-1 caption"/>
                        </v-col>

                        <v-col cols="12"> <!-- Replaced v-flex xs12 -->
                            <Field name="tolerancia" v-model="form.tolerancia" v-slot="{ field, errors }">
                                <v-text-field
                                    v-bind="field"
                                    label="Tolerância"
                                    :error-messages="errors"
                                ></v-text-field>
                            </Field>
                            <ErrorMessage name="tolerancia" class="red--text text--darken-1 caption"/>
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
            descricao: yup.string().required('A descrição é obrigatória.'),
            nivel: yup.string().required('O nível é obrigatório.'), // Assuming nivel ID is a string
            tolerancia: yup.string().required('A tolerância é obrigatória.'), // Or number if applicable
        });
        return {
            niveis: [],
            schema
        };
    },
    methods: {
        onSubmit() {
            this.save(); // Calls save from CrudFormMixin
        }
    },
    created() {
        this.service = new Service('api/processos');
        this.serviceNiveis = new Service('api/niveis');
    },
    async mounted() {
        this.niveis = await this.serviceNiveis.findAll();
    }
}
</script>