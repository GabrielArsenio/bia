<template>
    <v-container fluid>

        <v-data-table hide-default-footer :fixed-header="true" :headers="headers" :items="items" :search="search"> <!-- fix-header to fixed-header -->
            <template v-slot:top>
                <v-toolbar variant="flat"> <!-- flat to variant="flat" -->
                    <v-toolbar-title>Indicativos de ação</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-text-field v-model="search" append-icon="search" label="Pesquisar" single-line hide-details density="compact"> <!-- Added density -->
                    </v-text-field>
                    <v-spacer></v-spacer>
                    <CadastroAcao :document="itemEditing" @cancel="itemEditing = null" @save="onSave"></CadastroAcao>
                </v-toolbar>
            </template>

            <template v-slot:item.actions="{ item }">
                <v-icon size="small" class="mr-2" @click="edit(item.raw || item)">
                    mdi-pencil
                </v-icon>
                <v-icon size="small" @click="remove(item.raw || item)">
                    mdi-delete
                </v-icon>
            </template>

        </v-data-table>

        <CadastroEvento :document="documentEvent" @cancel="documentEvent = false" @save="onSave"></CadastroEvento>

        <DialogConfirmRemove :active="itemRemoving" @cancel="itemRemoving = null" @remove="onRemove">
        </DialogConfirmRemove>
    </v-container>
</template>

<script>
import { Service } from '../../domain/Service'
import DialogConfirmRemove from '../shared/DialogConfirmRemove'
import CadastroAcao from '../cadastros/CadastroAcao'
import CadastroEvento from '../cadastros/CadastroEvento'
import CrudListMixin from '../../mixins/crud-list.mixin'

export default {
    name: 'Acoes',
    mixins: [CrudListMixin],
    components: {
        DialogConfirmRemove,
        CadastroAcao,
        CadastroEvento
    },
    data() {
        return {
            documentEvent: null,
            headers: [ // text -> title, value -> key
                { title: 'Processo', key: 'processo.descricao' },
                { title: 'Ameaça', key: 'ameaca.descricao' },
                { title: 'Procedimento', key: 'procedimento' },
                { title: 'Ações', key: 'actions', sortable: false, align: 'right' }
            ],
        }
    },
    created() {
        this.service = new Service('api/acoes');
    }
}
</script>