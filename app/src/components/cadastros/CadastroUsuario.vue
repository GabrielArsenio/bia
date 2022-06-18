<template>
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
      <v-container grid-list-sm class="pa-4">
        <v-layout row wrap>
          <v-flex xs3>
            <v-text-field v-model="form._id" disabled label="Código"></v-text-field>
          </v-flex>

          <v-flex xs12>
            <v-text-field v-model="form.nome" label="Nome"></v-text-field>
          </v-flex>

          <v-flex xs12>
            <v-text-field v-model="form.login" label="Login"></v-text-field>
          </v-flex>

          <v-flex xs12>
            <v-text-field v-model="form.senha" :append-icon="show1 ? 'visibility_off' : 'visibility'"
              :type="show1 ? 'text' : 'password'" label="Senha" hint="Mínimo 8 caracteres" counter
              @click:append="show1 = !show1"></v-text-field>
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
import { Service } from "../../domain/Service";
import CrudFormMixin from "../../mixins/crud-form.mixin";

export default {
  mixins: [CrudFormMixin],
  props: {
    document: {
      required: true
    }
  },
  data() {
    return {
      show1: false,
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters",
        emailMatch: () => "The email and password you entered don't match"
      }
    };
  },
  created() {
    this.service = new Service(this.$resource("api/usuarios{/id}"))
  }
};
</script>