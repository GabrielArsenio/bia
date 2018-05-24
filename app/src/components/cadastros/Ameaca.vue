<template>
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
</template>