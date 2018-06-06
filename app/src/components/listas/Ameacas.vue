<template>
    <div>
        <v-card-title>
            Ameaças
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="search" label="Pesquisar ameaças" single-line hide-details></v-text-field>
        </v-card-title>

        <v-dialog v-model="dialog" max-width="500px">
            <v-btn slot="activator" color="primary" dark class="mb-2">Novo</v-btn>
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
                    <v-btn flat color="primary" @click="dialog = false">Cancelar</v-btn>
                    <v-btn flat @click="dialog = false;save()">Salvar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-data-table hide-actions :headers="headers" :items="items" :search="search">
            <template slot="items" slot-scope="props">
                <td>{{ props.item.descricao }}</td>
                <td class="justify-center layout px-0">
                    <v-btn icon class="mx-0" @click="editItem(props.item)">
                        <v-icon color="teal">edit</v-icon>
                    </v-btn>
                    <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                        <v-icon color="pink">delete</v-icon>
                    </v-btn>
                </td>
            </template>
        </v-data-table>
    </div>
</template>

<script>
    import {Service} from '../../domain/Service'

    export default {
        data() {
            return {
                dialog: false,
                ameaca: {

                },
                search: '',
                headers: [
                    { text: 'Descrição', value: 'descricao' },
                    { text: '', value: 'descricao', sortable: false, align: 'right' }
                ],
                items: []
            }
        },
        created() {
            this.service = new Service(this.$resource('api/ameacas{/id}'));

            this.service
                .findAll()
                .then(items => this.items = items);
        },
        methods: {
            save() {
                console.log('SAVE');
            }
        }
    }
</script>