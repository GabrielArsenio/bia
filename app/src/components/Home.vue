<template>
    <v-app id="inspire">
        <v-navigation-drawer fixed :clipped="$vuetify.breakpoint.mdAndUp" app v-model="drawer">
            <v-list dense>

                <v-list-tile @click="" :to="{ path: '/' }">
                    <v-list-tile-action>
                        <v-icon>home</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Início</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-divider></v-divider>

                <v-list-tile @click="" :to="{ path: '/processos' }">
                    <v-list-tile-action>
                        <v-icon>timeline</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Cadastro de processos</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile @click="" :to="{ path: '/ameacas' }">
                    <v-list-tile-action>
                        <v-icon>warning</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Cadastro de ameaças</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile @click="" :to="{ path: '/niveis' }">
                    <v-list-tile-action>
                        <v-icon>sort</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Cadastro de niveis de criticidade</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile @click="" :to="{ path: '/acoes' }">
                    <v-list-tile-action>
                        <v-icon>transfer_within_a_station</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Cadastro de indicativos de ação</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile @click="" :to="{ path: '/eventos' }">
                    <v-list-tile-action>
                        <v-icon>event_note</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Eventos</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-divider></v-divider>

                <v-list-tile @click="">
                    <v-list-tile-action>
                        <v-icon>settings</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Configurações</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile @click="">
                    <v-list-tile-action>
                        <v-icon>help</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Ajuda</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

            </v-list>
        </v-navigation-drawer>

        <v-toolbar color="blue darken-3" dark app :clipped-left="$vuetify.breakpoint.mdAndUp" fixed>
            <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
                <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
                <v-tooltip right>
                    <span class="hidden-sm-and-down" slot="activator">BIA</span>
                    <span>Business Impact Analysis</span>
                </v-tooltip>
            </v-toolbar-title>

            <v-text-field flat solo-inverted prepend-icon="search" label="Pesquisar" class="hidden-sm-and-down"></v-text-field>

            <v-spacer></v-spacer>

            <v-btn icon>
                <v-icon>notifications</v-icon>
            </v-btn>

            <v-btn icon large>
                <v-avatar size="32px" tile>
                    <img src="https://vuetifyjs.com/static/doc-images/logo.svg" alt="Usuário">
                </v-avatar>
            </v-btn>
        </v-toolbar>

        <v-content>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        data() {
            return {
                drawer: null
            }
        }
    }
</script>

<style>
</style>