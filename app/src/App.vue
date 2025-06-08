<template>
  <v-app>
    <router-view></router-view>

    <v-snackbar :timeout="6000" :bottom="true" v-model="snackbarSaved">
      Registro salvo com sucesso!
      <v-btn text color="white" @click="snackbarSaved = false">Fechar</v-btn>
    </v-snackbar>

    <v-snackbar :timeout="6000" :bottom="true" v-model="snackbarRemoved">
      Registro removido com sucesso!
      <v-btn text color="white" @click="snackbarRemoved = false">Fechar</v-btn>
    </v-snackbar>

    <v-snackbar :timeout="6000" :bottom="true" v-model="snackbarFindFailure">
      Erro ao listar!
      <v-btn text color="white" @click="snackbarFindFailure = false">Fechar</v-btn>
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
  methods: {
    showSaveSuccess() {
      this.snackbarSaved = true;
    },
    showRemoveSuccess() {
      this.snackbarRemoved = true;
    },
    showFindFailure() {
      this.snackbarFindFailure = true;
    }
  },
  mounted() {
    EventBus.on('save-success', this.showSaveSuccess);
    EventBus.on('remove-success', this.showRemoveSuccess);
    EventBus.on('find-failure', this.showFindFailure);
  },
  beforeUnmount() {
    EventBus.off('save-success', this.showSaveSuccess);
    EventBus.off('remove-success', this.showRemoveSuccess);
    EventBus.off('find-failure', this.showFindFailure);
  }
};
</script>
