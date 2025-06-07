<template>
  <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ handleSubmit }">
    <v-dialog v-model="isOpen" max-width="500px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" class="mb-2" v-bind="attrs" v-on="on">
          Novo usuário
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="grey lighten-4 py-4 title">
          {{ form._id ? 'Editar' : 'Novo' }} usuário
        </v-card-title>
        <v-container class="pa-4"> <!-- Removed grid-list-sm -->
          <v-row> <!-- Replaced v-layout -->
            <v-col cols="3"> <!-- Replaced v-flex xs3 -->
              <v-text-field v-model="form._id" disabled label="Código"></v-text-field>
            </v-col>

            <v-col cols="12"> <!-- Replaced v-flex xs12 -->
              <Field name="nome" v-model="form.nome" v-slot="{ field, errors }">
                <v-text-field
                  v-bind="field"
                  label="Nome"
                  :error-messages="errors"
                ></v-text-field>
              </Field>
              <ErrorMessage name="nome" class="red--text text--darken-1 caption"/>
            </v-col>

            <v-col cols="12"> <!-- Replaced v-flex xs12 -->
              <Field name="login" v-model="form.login" v-slot="{ field, errors }">
                <v-text-field
                  v-bind="field"
                  label="Login"
                  :error-messages="errors"
                ></v-text-field>
              </Field>
              <ErrorMessage name="login" class="red--text text--darken-1 caption"/>
            </v-col>

            <v-col cols="12"> <!-- Replaced v-flex xs12 -->
              <Field name="senha" v-model="form.senha" v-slot="{ field, errors }">
                <v-text-field
                  v-bind="field"
                  :append-icon="show1 ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="show1 ? 'text' : 'password'"
                  label="Senha"
                  hint="Mínimo 8 caracteres"
                  counter
                  @click:append="show1 = !show1"
                  :error-messages="errors"
                ></v-text-field>
              </Field>
              <ErrorMessage name="senha" class="red--text text--darken-1 caption"/>
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
import { Service } from "../../domain/Service";
import CrudFormMixin from "../../mixins/crud-form.mixin";
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
      nome: yup.string().required('O nome é obrigatório.'),
      login: yup.string().required('O login é obrigatório.'),
      senha: yup.string().required('A senha é obrigatória.').min(8, 'A senha deve ter no mínimo 8 caracteres.'),
    });
    return {
      show1: false,
      schema
      // Old 'rules' object is removed
    };
  },
  methods: {
    onSubmit() {
      this.save(); // Calls save from CrudFormMixin
    }
  },
  created() {
    this.service = new Service('api/usuarios');
  }
};
</script>