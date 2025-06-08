<template>
    <v-container fluid>

        <v-data-table hide-default-footer fixed-header :headers="headers" :items="items" :search="search"> {/* fix-header -> fixed-header */}
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Indicativos de ação</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-text-field v-model="search" append-icon="search" label="Pesquisar" single-line hide-details>
                    </v-text-field>
                    <v-spacer></v-spacer>
                    <CadastroAcao :document="itemEditing" @cancel="itemEditing = null" @save="onSave"></CadastroAcao>
                </v-toolbar>
            </template>

            <template v-slot:item.actions="{ item }">
                <v-icon size="small" class="mr-2" @click="edit(item)"> {/* small -> size="small" */}
                    edit
                </v-icon>
                <v-icon size="small" @click="remove(item)"> {/* small -> size="small" */}
                    delete
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
            headers: [
                { text: 'Processo', value: 'processo.descricao' },
                { text: 'Ameaça', value: 'ameaca.descricao' },
                { text: 'Procedimento', value: 'procedimento' },
                { text: 'Ações', value: 'actions', sortable: false, align: 'right' }
            ],
        }
    },
    created() {
        this.service = new Service('api/acoes');
    }
}
</script>