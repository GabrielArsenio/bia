<template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
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
      </v-col>
    </v-row>
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
      await new AuthService().login(this.form) // Removed this.$http
      this.$router.push({ name: "home" });
    }
  }
};
</script>