<template>
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
</template>