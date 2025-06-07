<template>
  <div>
    <!-- :clipped prop removed as it requires useDisplay, set to true or handle responsiveness later -->
    <!-- app prop removed -->
    <v-navigation-drawer v-model="drawer" clipped fixed>
      <v-list density="compact"> <!-- dense prop changed to density="compact" -->

        <v-list-item :to="{ path: '/' }" prepend-icon="home" title="Início"></v-list-item>

        <v-divider></v-divider>

        <v-subheader>Cadastros</v-subheader>

        <v-list-item :to="{ path: '/usuarios' }" prepend-icon="person" title="Usuários"></v-list-item>
        <v-list-item :to="{ path: '/niveis' }" prepend-icon="sort" title="Níveis de criticidade"></v-list-item>
        <v-list-item :to="{ path: '/ameacas' }" prepend-icon="warning" title="Ameaças"></v-list-item>
        <v-list-item :to="{ path: '/processos' }" prepend-icon="timeline" title="Processos"></v-list-item>
        <v-list-item :to="{ path: '/acoes' }" prepend-icon="transfer_within_a_station" title="Indicativos de ação"></v-list-item>

        <v-divider></v-divider>

        <v-subheader>Consultas</v-subheader>

        <v-list-item :to="{ path: '/processos-por-nivel-criticidade' }" prepend-icon="assignment" title="Processos por nível de criticidade"></v-list-item>
        <v-list-item :to="{ path: '/ameacas-aos-processos' }" prepend-icon="assignment" title="Ameaças aos processos"></v-list-item>
        <v-list-item :to="{ path: '/eventos-por-data' }" prepend-icon="assignment" title="Eventos por data"></v-list-item>
        <v-list-item :to="{ path: '/eventos-por-ameaca' }" prepend-icon="assignment" title="Eventos por ameaça"></v-list-item>
        <v-list-item :to="{ path: '/eventos-por-processo' }" prepend-icon="assignment" title="Eventos por processo"></v-list-item>
        <v-list-item :to="{ path: '/mapa-riscos' }" prepend-icon="assignment" title="Mapa de riscos"></v-list-item>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="primary"> <!-- app prop removed -->

      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>BIA</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- <v-text-field label="Pesquisar" solo-inverted prepend-icon="search">
      </v-text-field> -->

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>

      <v-menu location="bottom"> <!-- Changed offset-y to location="bottom" -->
        <template v-slot:activator="{ props: menuActivatorProps }">
          <v-btn icon v-bind="menuActivatorProps">
            <v-avatar size="32px" rounded="0"> <!-- Changed tile to rounded="0" -->
              <img src="../../avatar.png" alt="Usuário">
            </v-avatar>
          </v-btn>
        </template>

        <v-list density="compact"> <!-- Added density="compact" -->
          <v-list-item @click="logout" title="Sair"></v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      drawer: false
    }
  },
  methods: {
    logout() {
      localStorage.clear()
      this.$router.push({ name: 'login' })
    }
  }
};
</script>
