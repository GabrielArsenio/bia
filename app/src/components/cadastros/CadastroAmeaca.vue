<template>
    <v-dialog v-model="isOpen" max-width="500px">
        <template v-slot:activator="{ props }"> {/* Updated activator slot */}
            <v-btn color="primary" class="mb-2" v-bind="props">
                Nova ameaça
            </v-btn>
        </template>
        <v-card>
            <v-card-title class="grey lighten-4 py-4 title">
                {{ form._id ? 'Editar' : 'Nova' }} ameaça
            </v-card-title>
            <v-container class="pa-4"> {/* Removed grid-list-sm */}
                <v-row> {/* v-layout -> v-row */}
                    <v-col cols="3"> {/* v-flex -> v-col */}
                        <v-text-field label="Código" v-model="form._id" disabled></v-text-field>
                    </v-col>

                    <v-col cols="12"> {/* v-flex -> v-col */}
                        <v-text-field label="Descrição" v-model="form.descricao" name="descricao">
                        </v-text-field> {/* Removed v-validate and :error */}
                    </v-col>
                </v-row>
            </v-container>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="cancel()" variant="text">Cancelar</v-btn> {/* Added variant="text" */}
                <v-btn color="primary" @click="save()">Salvar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { Service } from '../../domain/Service'
import CrudFormMixin from '../../mixins/crud-form.mixin';

export default {
    mixins: [CrudFormMixin],
    props: {
        document: {
            required: true
        }
    },
    created() {
        this.service = new Service('api/ameacas')
    }
}
</script>