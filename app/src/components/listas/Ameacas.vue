<template>
    <v-container fluid>

        <v-data-table hide-default-footer :fixed-header="true" :headers="headers" :items="items" :search="search"> <!-- fix-header, headers -->
            <template v-slot:top>
                <v-toolbar variant="flat"> <!-- flat -->
                    <v-toolbar-title>Ameaças</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-text-field v-model="search" append-icon="search" label="Pesquisar" single-line hide-details density="compact"> <!-- density -->
                    </v-text-field>
                    <v-spacer></v-spacer>
                    <CadastroAmeaca :document="itemEditing" @cancel="itemEditing = null" @save="onSave">
                    </CadastroAmeaca>
                </v-toolbar>
            </template>

            <template v-slot:item.actions="{ item }"> <!-- item slot, icon size, mdi icons -->
                <v-icon size="small" class="mr-2" @click="edit(item.raw || item)">
                    mdi-pencil
                </v-icon>
                <v-icon size="small" @click="remove(item.raw || item)">
                    mdi-delete
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
import CadastroAmeaca from '../cadastros/CadastroAmeaca'
import CrudListMixin from '../../mixins/crud-list.mixin'

export default {
    name: 'Ameacas',
    mixins: [CrudListMixin],
    components: {
        DialogConfirmRemove,
        CadastroAmeaca
    },
    data() {
        return {
            headers: [ // text -> title, value -> key
                { title: 'Descrição', key: 'descricao' },
                { title: 'Ações', key: 'actions', sortable: false, align: 'right' }
            ]
        }
    },
    created() {
        this.service = new Service('api/ameacas');
    }
}
</script>