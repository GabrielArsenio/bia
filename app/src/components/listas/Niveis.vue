<template>
    <v-container fluid>

        <v-data-table hide-default-footer fix-header :headers="headers" :items="items" :search="search">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Níveis de criticidade</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-text-field v-model="search" append-icon="search" label="Pesquisar" single-line hide-details>
                    </v-text-field>
                    <v-spacer></v-spacer>
                    <CadastroNivel :document="itemEditing" @cancel="itemEditing = null" @save="onSave"></CadastroNivel>
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

        <DialogConfirmRemove :active="itemRemoving" @cancel="itemRemoving = null" @remove="onRemove">
        </DialogConfirmRemove>
    </v-container>
</template>

<script>
import { Service } from '../../domain/Service'
import DialogConfirmRemove from '../shared/DialogConfirmRemove'
import CadastroNivel from '../cadastros/CadastroNivel'
import CrudListMixin from '../../mixins/crud-list.mixin'

export default {
    name: 'Niveis',
    mixins: [CrudListMixin],
    components: {
        DialogConfirmRemove,
        CadastroNivel
    },
    data() {
        return {
            headers: [
                { text: 'Descrição', value: 'descricao' },
                { text: 'Ações', value: 'actions', sortable: false, align: 'right' }
            ]
        }
    },
    created() {
        this.service = new Service(this.$resource('api/niveis{/id}'));
    }
}
</script>