<template>
    <div>
        <v-card-title>
            Ameaças
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="search" label="Pesquisar ameaças" single-line hide-details></v-text-field>
        </v-card-title>

        <v-btn slot="activator" color="primary" dark class="mb-2" @click="create">Novo</v-btn>

        <v-data-table hide-actions :headers="headers" :items="items" :search="search">
            <template slot="items" slot-scope="props">
                <td>{{ props.item.descricao }}</td>
                <td class="justify-center layout px-0">
                    <v-btn icon class="mx-0" @click="edit(props.item)">
                        <v-icon color="teal">edit</v-icon>
                    </v-btn>
                    <v-btn icon class="mx-0" @click="onRemove(props.item)">
                        <v-icon color="pink">delete</v-icon>
                    </v-btn>
                </td>
            </template>
        </v-data-table>

        <cadastro-ameaca v-if="document" :document="document" @cancel="onCancel()" @save="onSave"></cadastro-ameaca>

        <v-snackbar :timeout="6000" :bottom="true" v-model="alertSaved">
            Registro salvo com sucesso!
            <v-btn flat color="white" @click.native="alertSaved = false">Fechar</v-btn>
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
    import Ameaca from '../../domain/Ameaca'
    import DialogConfirmRemove from '../shared/DialogConfirmRemove'
    import CadastroAmeaca from '../cadastros/CadastroAmeaca'
    import _ from 'lodash'

    export default {
        components: {
            'dialog-confirm-remove': DialogConfirmRemove,
            'cadastro-ameaca': CadastroAmeaca
        },
        data() {
            return {
                dialog: false,
                dialogConfirmRemove: false,
                alertSaved: false,
                alertRemoved: false,
                document: null,
                oldDocument: new Ameaca(),
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
            create() {
                this.document = new Ameaca()
            },
            edit(document) {
                this.document = document;
            },
            onCancel() {
                this.document = null;
            },
            onSave(newDocument) {
                this.alertSaved = true;
                if (!this.document._id) {
                    this.items.push(newDocument)
                } else {
                    let indice = this.items.indexOf(this.document);
                    this.items.splice(indice, 1);
                    this.items.push(newDocument)
                }
                this.document = null;
            },
            onRemove(document) {
                this.document = document;
                this.dialogConfirmRemove = true;
                console.log('onRemove>document', document)
            },
            remove() {
                this.service
                    .remove(this.document._id)
                    .then(() => {
                        this.alertRemoved = true;
                        let indice = this.items.indexOf(this.document);
                        this.items.splice(indice, 1);
                        this.document = new Ameaca();
                    }, err => console.log(err));

                this.dialogConfirmRemove = false;
            }
        }
    }
</script>