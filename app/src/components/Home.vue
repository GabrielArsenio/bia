import favicon-256 from '../../favicon-256.png';
<template>
    <v-app>
        <v-navigation-drawer fixed app v-model="drawer">
        <!-- <v-navigation-drawer fixed :clipped="$vuetify.breakpoint.mdAndUp" app v-model="drawer"> -->
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

        <v-toolbar color="blue darken-3" dark fixed>
        <!-- <v-toolbar color="blue darken-3" dark app :clipped-left="$vuetify.breakpoint.mdAndUp" fixed> -->
            <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
                <!-- <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon> -->
                <!-- <v-tooltip right>
                    <span class="hidden-sm-and-down" slot="activator">BIA</span>
                    <span>Business Impact Analysis</span>
                </v-tooltip> -->
            </v-toolbar-title>

            <v-text-field
                label="Pesquisar"
                flat
                solo-inverted
                prepend-icon="search"
                class="hidden-sm-and-down"
            ></v-text-field>

            <v-spacer></v-spacer>

            <v-btn icon>
                <v-icon>notifications</v-icon>
            </v-btn>


            <v-menu bottom left>
                <!-- <v-btn icon large dark slot="activator">
                    <v-avatar size="32px" tile>
                        <img src="../../avatar.png" alt="Usuário">
                    </v-avatar>
                </v-btn> -->

                <v-list>
                    <v-list-item @click="sair">Sair</v-list-item>
                </v-list>
            </v-menu>
        </v-toolbar>

        <v-main>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script>
    export default {
        name: 'Home',
        data() {
            return {
                drawer: null
            }
        },
        methods: {
            sair() {
                localStorage.clear()                
                this.$router.push({ name: 'login' })
            }
        }
    }
</script>

<style>
</style>