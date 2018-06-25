<template>
    <div>
        <v-card-title>
            Níveis de criticidade
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="search" label="Pesquisar níveis de criticidade" single-line hide-details></v-text-field>
        </v-card-title>

        <v-btn slot="activator" color="primary" dark class="mb-2" @click.stop="create">Novo</v-btn>

        <v-data-table hide-actions :headers="headers" :items="items" :search="search">
            <template slot="items" slot-scope="props">
                <td>{{ props.item.descricao }}</td>
                <td class="justify-center layout px-0">
                    <v-btn icon class="mx-0" @click="edit(props.item)">
                        <v-icon color="teal">edit</v-icon>
                    </v-btn>
                    <v-btn icon class="mx-0" @click="remove(props.item)">
                        <v-icon color="pink">delete</v-icon>
                    </v-btn>
                </td>
            </template>
        </v-data-table>

        <cadastro-nivel :document="document" @cancel="document = false" @save="onSave"></cadastro-nivel>

        <dialog-confirm-remove :active="documentRemoving" @cancel="documentRemoving = false" @remove="onRemove"></dialog-confirm-remove>

        <v-snackbar :timeout="6000" :bottom="true" v-model="alertSaved">
            Registro salvo com sucesso!
            <v-btn flat color="white" @click.native="alertSaved = false">Fechar</v-btn>
        </v-snackbar>

        <v-snackbar :timeout="6000" :bottom="true" v-model="alertRemoved">
            Registro removido com sucesso!
            <v-btn flat color="pink" @click.native="alertRemoved = false">Fechar</v-btn>
        </v-snackbar>
    </div>
</template>

<script>
    import { Service } from '../../domain/Service'
    import Nivel from '../../domain/Nivel'
    import DialogConfirmRemove from '../shared/DialogConfirmRemove'
    import CadastroNivel from '../cadastros/CadastroNivel'

    export default {
        components: {
            'dialog-confirm-remove': DialogConfirmRemove,
            'cadastro-nivel': CadastroNivel
        },
        data() {
            return {
                alertSaved: false,
                alertRemoved: false,
                document: null,
                documentRemoving: null,
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
            create() {
                if (this.document) {
                    this.document = false
                }
                this.document = new Nivel()
            },
            edit(document) {
                if (this.document) {
                    this.document = false
                }
                this.document = document
            },
            remove(document) {
                if (this.documentRemoving) {
                    this.documentRemoving = false
                }
                this.documentRemoving = document
            },
            onSave(newDocument) {
                this.alertSaved = true
                if (!this.document._id) {
                    this.items.push(newDocument)
                } else {
                    let indice = this.items.indexOf(this.document)
                    this.items.splice(indice, 1)
                    this.items.push(newDocument)
                }
                this.document = false
            },
            onRemove() {
                this.service
                    .remove(this.documentRemoving._id)
                    .then(() => {
                        let indice = this.items.indexOf(this.documentRemoving);
                        this.items.splice(indice, 1);
                        this.alertRemoved = true;
                        this.documentRemoving = false;
                    }, err => console.log(err));
            }
        }
    }
</script>