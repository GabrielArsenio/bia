<template>
    <div>
        <v-card-title>
            Níveis de criticidade
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="search" label="Pesquisar ameaças" single-line hide-details></v-text-field>
        </v-card-title>

        <v-dialog v-model="dialog" max-width="500px">
            <v-btn slot="activator" color="primary" dark class="mb-2">Novo</v-btn>
            <v-card>
                <v-card-title class="grey lighten-4 py-4 title">
                    Novo nível de criticidade
                </v-card-title>
                <v-container grid-list-sm class="pa-4">
                    <v-layout row wrap>

                        <v-flex xs3>
                            <v-text-field v-model="document._id" disabled label="Código"></v-text-field>
                        </v-flex>

                        <v-flex xs12>
                            <v-text-field v-model="document.descricao" label="Descrição"></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat @click="dialog = false">Cancelar</v-btn>
                    <v-btn flat color="primary" @click="dialog = false;save()">Salvar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-data-table hide-actions :headers="headers" :items="items" :search="search">
            <template slot="items" slot-scope="props">
                <td>{{ props.item.descricao }}</td>
                <td class="justify-center layout px-0">
                    <v-btn icon class="mx-0" @click="onEdit(props.item)">
                        <v-icon color="teal">edit</v-icon>
                    </v-btn>
                    <v-btn icon class="mx-0" @click="onRemove(props.item)">
                        <v-icon color="pink">delete</v-icon>
                    </v-btn>
                </td>
            </template>
        </v-data-table>

        <v-snackbar :timeout="6000" :bottom="true" v-model="alertSaved">
            Registro salvo com sucesso!
            <v-btn flat color="pink" @click.native="alertSaved = false">Fechar</v-btn>
        </v-snackbar>

        <v-snackbar :timeout="6000" :bottom="true" v-model="alertRemoved">
            Registro removido com sucesso!
            <v-btn flat color="pink" @click.native="alertRemoved = false">Fechar</v-btn>
        </v-snackbar>

        <dialog-confirm-remove :active="dialogConfirmRemove" @cancel="cancel()" @remove="remove()"></dialog-confirm-remove>
    </div>
</template>

<script>
    import { Service } from '../../domain/Service'
    import Nivel from '../../domain/Nivel'
    import DialogConfirmRemove from '../shared/DialogConfirmRemove'
    import _ from 'lodash'

    export default {
        components: {
            'dialog-confirm-remove': DialogConfirmRemove
        },
        data() {
            return {
                dialog: false,
                dialogConfirmRemove: false,
                alertSaved: false,
                alertRemoved: false,
                document: new Nivel(),
                oldDocument: new Nivel(),
                search: '',
                headers: [
                    { text: 'Descrição', value: 'descricao' },
                    { text: '', value: 'descricao', sortable: false, align: 'right' }
                ],
                items: []
            }
        },
        created() {
            this.service = new Service(this.$resource('api/niveis{/id}'));

            this.service
                .findAll()
                .then(items => this.items = items);
        },
        methods: {
            save() {
                this.service
                    .save(this.document)
                    .then(() => {
                        this.alertSaved = true;
                        if (!this.document._id) {
                            this.items.push(this.document)
                        } else {
                            let indice = this.items.indexOf(this.oldDocument);
                            this.items.splice(indice, 1);
                            this.items.push(this.document)
                        }
                        this.document = new Nivel();
                    }, err => console.log(err))
            },
            onRemove(document) {
                this.document = document;
                this.dialogConfirmRemove = true;
                console.log('onRemove>document', document)
            },
            onEdit(document) {
                this.document = _.clone(document)
                this.oldDocument = document;
                this.dialog = true;
                console.log('onEdit>document', document)
            },
            cancel() {
                this.document = new Nivel();
                this.dialogConfirmRemove = false;
            },
            remove() {
                this.service
                    .remove(this.document._id)
                    .then(() => {
                        this.alertRemoved = true;
                        let indice = this.items.indexOf(this.document);
                        this.items.splice(indice, 1);
                        this.document = new Nivel();
                    }, err => console.log(err));

                this.dialogConfirmRemove = false;
            }
        }
    }
</script>