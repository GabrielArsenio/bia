<template>
  <v-app>
    <router-view></router-view>

    <v-snackbar :timeout="6000" :bottom="true" v-model="snackbarSaved">
      Registro salvo com sucesso!
      <v-btn text color="white" @click.native="snackbarSaved = false">Fechar</v-btn>
    </v-snackbar>

    <v-snackbar :timeout="6000" :bottom="true" v-model="snackbarRemoved">
      Registro removido com sucesso!
      <v-btn text color="white" @click.native="snackbarRemoved = false">Fechar</v-btn>
    </v-snackbar>

    <v-snackbar :timeout="6000" :bottom="true" v-model="snackbarFindFailure">
      Erro ao listar!
      <v-btn text color="white" @click.native="snackbarFindFailure = false">Fechar</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import EventBus from './event-bus';

export default {
  name: "App",
  data() {
    return {
      snackbarSaved: false,
      snackbarRemoved: false,
      snackbarFindFailure: false
    }
  },
  mounted() {
    EventBus.$on('save-success', () => this.snackbarSaved = true)
    EventBus.$on('remove-success', () => this.snackbarRemoved = true)
    EventBus.$on('find-failure', () => this.snackbarFindFailure = true)
  }
};
</script>
