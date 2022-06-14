<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>BIA - Business Impact Analysis</v-toolbar-title>
              </v-toolbar>

              <v-card-text>
                <v-form>
                  <v-text-field v-model="document.login" prepend-icon="person" label="Usuário" type="text"></v-text-field>
                  <v-text-field v-model="document.senha" prepend-icon="lock" label="Senha" type="password"></v-text-field>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="entrar">Entrar</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { AuthService } from "../domain/AuthService";

export default {
  name: "Login",
  data: () => ({
    document: {
      login: "",
      senha: ""
    }
  }),
  methods: {
    entrar() {
      new AuthService(this.$http).login(this.document).then(err => {
        this.$router.push({ name: "app" });
      }).catch((err) => {console.log(err)});
    }
  }
};
</script>