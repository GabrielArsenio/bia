<template>
    <v-dialog v-model="isOpen" max-width="500px">
        <v-card>
            <v-card-title class="grey lighten-4 py-4 title">
                {{ tempDocument._id ? 'Editar' : 'Novo' }} usuário
            </v-card-title>
            <v-container grid-list-sm class="pa-4">
                <v-layout row wrap>
                    <v-flex xs3>
                        <v-text-field v-model="tempDocument._id" disabled label="Código"></v-text-field>
                    </v-flex>

                    <v-flex xs12>
                        <v-text-field v-model="tempDocument.nome" label="Nome"></v-text-field>
                    </v-flex>

                    <v-flex xs12>
                        <v-text-field v-model="tempDocument.login" label="Login"></v-text-field>
                    </v-flex>

                    <v-flex xs12>
                        <v-text-field
                            v-model="tempDocument.senha"
                            :append-icon="show1 ? 'visibility_off' : 'visibility'"
                            :type="show1 ? 'text' : 'password'"
                            label="Senha"
                            hint="Mínimo 8 caracteres"
                            counter
                            @click:append="show1 = !show1"
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
import { Service } from "../../domain/Service";

export default {
  props: {
    document: {
      required: true
    }
  },
  data() {
    return {
      isOpen: false,
      tempDocument: {senha: ''},
      show1: false,
      password: "Password",
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters",
        emailMatch: () => "The email and password you entered don't match"
      }
    };
  },
  watch: {
    document: function(newVal, oldVal) {
      if (!this.document) {
        this.isOpen = false;
      }

      if (typeof this.document === "object") {
        this.isOpen = true;
        this.tempDocument = Object.assign({}, this.document);
      }
    }
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    save() {
      new Service(this.$resource("api/usuarios{/id}"))
        .save(this.tempDocument)
        .then(
          res => {
            this.$emit("save", res.body || this.tempDocument);
          },
          err => console.log(err)
        );
    }
  }
};
</script>