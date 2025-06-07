<template>
    <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors: formErrors, handleSubmit }">
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
                <v-container class="pa-4"> <!-- Removed grid-list-sm -->
                    <v-row> <!-- Replaced v-layout -->
                        <v-col cols="3"> <!-- Replaced v-flex xs3 -->
                            <v-text-field label="Código" v-model="form._id" disabled></v-text-field>
                        </v-col>

                        <v-col cols="12"> <!-- Replaced v-flex xs12 -->
                            <Field name="descricao" v-model="form.descricao" v-slot="{ field, errors: fieldErrors }">
                                <v-text-field
                                    label="Descrição"
                                    v-bind="field"
                                    :error-messages="fieldErrors.length ? fieldErrors : (formErrors.descricao ? [formErrors.descricao] : [])"
                                ></v-text-field>
                            </Field>
                            <ErrorMessage name="descricao" class="red--text text--darken-1 caption"/>
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
    components: { // Register VeeValidate components
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
        });
        return {
            schema, // Expose schema to template
        };
    },
    methods: {
        onSubmit() { // Renamed original save to onSubmit to avoid conflict if mixin also has onSubmit
            // The actual save logic is called by the mixin's save method,
            // which is now triggered by the Form's submit event if validation passes.
            // If CrudFormMixin's save method needs to be explicitly called:
            this.save();
        }
    },
    created() {
        this.service = new Service('api/ameacas');
    }
}
</script>