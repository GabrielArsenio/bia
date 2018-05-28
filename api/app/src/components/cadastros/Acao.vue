<template>
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
</template>