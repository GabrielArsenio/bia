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

        <CadastroNivel :document="document" @cancel="document = false" @save="onSave"></CadastroNivel>

        <DialogConfirmRemove :active="documentRemoving" @cancel="documentRemoving = false" @remove="onRemove"></DialogConfirmRemove>

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
    import DialogConfirmRemove from '../shared/DialogConfirmRemove'
    import CadastroNivel from '../cadastros/CadastroNivel'

    export default {
        name: 'Niveis',
        components: {
            DialogConfirmRemove,
            CadastroNivel
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
                    });
            }
        }
    }
</script>