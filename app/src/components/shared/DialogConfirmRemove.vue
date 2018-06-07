<template>
    <v-dialog v-model="active" max-width="225px">
        <v-card>
            <v-card-title class="grey lighten-4 py-4 title">
                Confirmar exclusão?
            </v-card-title>
            <v-card-actions>
                <v-btn flat @click="onCancel()">Cancelar</v-btn>
                <v-btn flat color="error" @click="onRemove()">Excluir</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        props: {
            active: {
                type: Boolean,
                required: true
            }
        },
        methods: {
            onCancel() {
                this.$emit('cancel')
            },
            onRemove() {
                this.$emit('remove')
            }
        }
    }
</script>