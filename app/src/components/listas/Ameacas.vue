<template>
    <div>
        <v-card-title>
            Ameaças
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="search" label="Pesquisar ameaças" single-line hide-details></v-text-field>
        </v-card-title>

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
    import Service from '../../domain/Service'

    export default {
        data() {
            return {
                search: '',
                headers: [
                    { text: 'Descrição', value: 'descricao' },
                    { text: '', value: 'descricao', sortable: false, align: 'right' }
                ],
                items: []
            }
        },
        created() {
            this.service = new Service(this.$resource('ameacas{/id}'));

            this.service
                .findAll()
                .then(items => this.items = items);
        },
        methods: {
        }
    }
</script>