<template>
    <div>
        <v-card-title>
            Eventos por data
            <v-spacer></v-spacer>
            <!-- <v-text-field
                label="Pesquisar eventos"
                v-model="search"
                append-icon="search"
                single-line
                hide-details
            ></v-text-field> -->
        </v-card-title>

        <v-data-table hide-actions fix-header :headers="headers" :items="items" :search="search">
            <template slot="items" slot-scope="props">
                <td>{{ props.item.descricao }}</td>
            </template>
        </v-data-table>
    </div>
</template>

<script>
    import { Service } from '../../domain/Service'

    export default {
        name: 'Eventos',
        data() {
            return {
                alertSaved: false,
                alertRemoved: false,
                document: false,
                documentRemoving: false,
                search: '',
                headers: [
                    { text: 'Descrição', value: 'descricao' }
                ],
                items: []
            }
        },
        created() {
            this.service = new Service(this.$resource('api/eventos{/id}'));

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
                    }, err => console.log(err));
            }
        }
    }
</script>