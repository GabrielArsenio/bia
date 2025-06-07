<template>
  <v-app>
    <router-view></router-view>

    <v-snackbar :timeout="6000" :bottom="true" v-model="snackbarSaved">
      Registro salvo com sucesso!
      <v-btn variant="text" color="white" @click="snackbarSaved = false">Fechar</v-btn> <!-- Removed .native -->
    </v-snackbar>

    <v-snackbar :timeout="6000" :bottom="true" v-model="snackbarRemoved">
      Registro removido com sucesso!
      <v-btn variant="text" color="white" @click="snackbarRemoved = false">Fechar</v-btn> <!-- Removed .native -->
    </v-snackbar>

    <v-snackbar :timeout="6000" :bottom="true" v-model="snackbarFindFailure">
      Erro ao listar!
      <v-btn variant="text" color="white" @click="snackbarFindFailure = false">Fechar</v-btn> <!-- Removed .native -->
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
  methods: { // Store handlers in methods to ensure `this` context if needed, or define them directly
    onSaveSuccess() { this.snackbarSaved = true; },
    onRemoveSuccess() { this.snackbarRemoved = true; },
    onFindFailure() { this.snackbarFindFailure = true; }
  },
  mounted() {
    EventBus.on('save-success', this.onSaveSuccess);
    EventBus.on('remove-success', this.onRemoveSuccess);
    EventBus.on('find-failure', this.onFindFailure);
  },
  beforeUnmount() {
    EventBus.off('save-success', this.onSaveSuccess);
    EventBus.off('remove-success', this.onRemoveSuccess);
    EventBus.off('find-failure', this.onFindFailure);
  }
};
</script>
