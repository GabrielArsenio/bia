<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>BIA - Business Impact Analysis</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-form>
              <v-text-field v-model="form.login" prepend-icon="person" label="Usuário" type="text"></v-text-field>
              <v-text-field v-model="form.senha" prepend-icon="lock" label="Senha" type="password"></v-text-field>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="login">Entrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { AuthService } from "../domain/AuthService";

export default {
  name: "Login",
  data: () => ({
    form: {}
  }),
  methods: {
    async login() {
      await new AuthService(this.$http).login(this.form)
      this.$router.push({ name: "home" });
    }
  }
};
</script>