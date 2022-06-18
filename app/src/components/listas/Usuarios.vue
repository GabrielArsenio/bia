<template>
    <v-container fluid>

        <v-data-table hide-default-footer fix-header :headers="headers" :items="items" :search="search">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Usuários</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-text-field v-model="search" append-icon="search" label="Pesquisar" single-line hide-details>
                    </v-text-field>
                    <v-spacer></v-spacer>
                    <CadastroUsuario :document="document" @cancel="document = false" @save="onSave"></CadastroUsuario>
                </v-toolbar>
            </template>

            <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="edit(item)">
                    edit
                </v-icon>
                <v-icon small @click="remove(item)">
                    delete
                </v-icon>
            </template>

        </v-data-table>

        <DialogConfirmRemove :active="documentRemoving" @cancel="documentRemoving = false" @remove="onRemove">
        </DialogConfirmRemove>
    </v-container>
</template>

<script>
import { Service } from '../../domain/Service'
import DialogConfirmRemove from '../shared/DialogConfirmRemove'
import CadastroUsuario from '../cadastros/CadastroUsuario'

export default {
    name: 'Usuarios',
    components: {
        DialogConfirmRemove,
        CadastroUsuario
    },
    data() {
        return {
            dialog: false,
            document: false,
            documentRemoving: false,
            search: '',
            headers: [
                { text: 'Nome', value: 'nome' },
                { text: 'Login', value: 'login' },
                { text: 'Ações', value: 'actions', sortable: false, align: 'right' }
            ],
            items: []
        }
    },
    created() {
        this.service = new Service(this.$resource('api/usuarios{/id}'));

        this.service
            .findAll()
            .then(items => this.items = items);
    },
    methods: {
        create() {
            if (this.document) {
                this.document = false
            }
            this.document = {}
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
                    this.documentRemoving = false;
                });
        }
    }
}
</script>