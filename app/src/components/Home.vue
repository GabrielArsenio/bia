<template>
    <v-app id="inspire">
        <v-navigation-drawer fixed :clipped="$vuetify.breakpoint.mdAndUp" app v-model="drawer">
            <v-list dense>
                <v-list-tile @click="cadastroProcessos = !cadastroProcessos" :key="">
                    <v-list-tile-action>
                        <v-icon>timeline</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Cadastro de processos</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile @click="cadastroAmeacas = !cadastroAmeacas" :key="">
                    <v-list-tile-action>
                        <v-icon>warning</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Cadastro de ameaças</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile @click="cadastroNiveisCricitidade = !cadastroNiveisCricitidade" :key="">
                    <v-list-tile-action>
                        <v-icon>sort</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Cadastro de niveis de criticidade</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile @click="cadastroIndicativosAcao = !cadastroIndicativosAcao" :key="">
                    <v-list-tile-action>
                        <v-icon>transfer_within_a_station</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Cadastro de indicativos de ação</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-divider></v-divider>

                <v-list-tile @click="" :key="">
                    <v-list-tile-action>
                        <v-icon>settings</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Configurações</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile @click="" :key="">
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
            <v-list>
                <v-list-tile>Descrição</v-list-tile>
                <v-list-tile v-for="item in listaProcessos" @click="">
                    {{ item }}
                </v-list-tile>
            </v-list>
        </v-content>

        <v-dialog v-model="cadastroProcessos" max-width="500px">
            <v-card>
                <v-card-title class="grey lighten-4 py-4 title">
                    Novo processo
                </v-card-title>
                <v-container grid-list-sm class="pa-4">
                    <v-layout row wrap>

                        <v-flex xs3>
                            <v-text-field placeholder="Código"></v-text-field>
                        </v-flex>

                        <v-flex xs12>
                            <v-text-field placeholder="Descricao"></v-text-field>
                        </v-flex>

                        <v-flex xs6>
                            <v-select placeholder="Nível"></v-select>
                        </v-flex>

                        <v-flex xs6>
                            <v-text-field placeholder="Tolerância"></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="cadastroProcessos = false">Cancelar</v-btn>
                    <v-btn flat @click="cadastroProcessos = false">Salvar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="cadastroIndicativosAcao" max-width="500px">
            <v-card>
                <v-card-title class="grey lighten-4 py-4 title">
                    Nova ação
                </v-card-title>
                <v-container grid-list-sm class="pa-4">
                    <v-layout row wrap>

                        <v-flex xs3>
                            <v-text-field placeholder="Código"></v-text-field>
                        </v-flex>

                        <v-flex xs12>
                            <v-select :items="itemsIndicativosAcao" label="Processo" single-line></v-select>
                        </v-flex>

                        <v-flex xs12>
                            <v-select label="Ameaça" single-line></v-select>
                        </v-flex>

                        <v-flex xs12>
                            <v-text-field placeholder="Procedimento"></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="cadastroIndicativosAcao = false">Cancelar</v-btn>
                    <v-btn flat @click="cadastroIndicativosAcao = false">Salvar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="cadastroAmeacas" max-width="500px">
            <v-card>
                <v-card-title class="grey lighten-4 py-4 title">
                    Nova ameaça
                </v-card-title>
                <v-container grid-list-sm class="pa-4">
                    <v-layout row wrap>

                        <v-flex xs3>
                            <v-text-field placeholder="Código"></v-text-field>
                        </v-flex>

                        <v-flex xs12>
                            <v-text-field placeholder="Descrição"></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="cadastroAmeacas = false">Cancelar</v-btn>
                    <v-btn flat @click="cadastroAmeacas = false">Salvar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="cadastroNiveisCricitidade" max-width="500px">
            <v-card>
                <v-card-title class="grey lighten-4 py-4 title">
                    Novo nível de criticidade
                </v-card-title>
                <v-container grid-list-sm class="pa-4">
                    <v-layout row wrap>

                        <v-flex xs3>
                            <v-text-field placeholder="Código"></v-text-field>
                        </v-flex>

                        <v-flex xs12>
                            <v-text-field placeholder="Descrição"></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="cadastroNiveisCricitidade = false">Cancelar</v-btn>
                    <v-btn flat @click="cadastroNiveisCricitidade = false">Salvar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app>
</template>

<script>
    export default {
        data() {
            return {
                drawer: null,
                cadastroProcessos: false,
                cadastroIndicativosAcao: false,
                cadastroAmeacas: false,
                cadastroNiveisCricitidade: false,
                itemsIndicativosAcao: [
                    'Despache de bagagem - recebimento',
                    'Despache de bagagem - envio',
                    'Frete - recebimento',
                    'Frete - envio'
                ],
                listaProcessos: [
                    'Despache de bagagem - recebimento',
                    'Despache de bagagem - envio',
                    'Frete - recebimento',
                    'Frete - envio'
                ]
            }
        }
    }
</script>

<style>
</style>