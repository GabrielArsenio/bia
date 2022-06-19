<template>
  <div>
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.mdAndUp" fixed app>
      <v-list dense>

        <v-list-item :to="{ path: '/' }">
          <v-list-item-action>
            <v-icon>home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Início</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-subheader>Cadastros</v-subheader>

        <v-list-item :to="{ path: '/usuarios' }">
          <v-list-item-action>
            <v-icon>person</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Usuários</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{ path: '/niveis' }">
          <v-list-item-action>
            <v-icon>sort</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Níveis de criticidade</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{ path: '/ameacas' }">
          <v-list-item-action>
            <v-icon>warning</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Ameaças</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{ path: '/processos' }">
          <v-list-item-action>
            <v-icon>timeline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Processos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{ path: '/acoes' }">
          <v-list-item-action>
            <v-icon>transfer_within_a_station</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Indicativos de ação</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-subheader>Consultas</v-subheader>

        <v-list-item :to="{ path: '/processos-por-nivel-criticidade' }">
          <v-list-item-action>
            <v-icon>assignment</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Processos por nível de criticidade</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{ path: '/ameacas-aos-processos' }">
          <v-list-item-action>
            <v-icon>assignment</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Ameaças aos processos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{ path: '/eventos-por-data' }">
          <v-list-item-action>
            <v-icon>assignment</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Eventos por data</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{ path: '/eventos-por-ameaca' }">
          <v-list-item-action>
            <v-icon>assignment</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Eventos por ameaça</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{ path: '/eventos-por-processo' }">
          <v-list-item-action>
            <v-icon>assignment</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Eventos por processo</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{ path: '/mapa-riscos' }">
          <v-list-item-action>
            <v-icon>assignment</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Mapa de riscos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary">

      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>BIA</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- <v-text-field label="Pesquisar" solo-inverted prepend-icon="search">
      </v-text-field> -->

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-on="on" v-bind="attrs">
            <v-avatar size="32px" tile>
              <img src="../../avatar.png" alt="Usuário">
            </v-avatar>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="logout">Sair</v-list-item>
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
