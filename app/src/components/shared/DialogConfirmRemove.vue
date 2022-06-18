<template>
    <v-dialog v-model="isOpen" max-width="225px">
        <v-card>
            <v-card-title class="grey lighten-4 py-4 title">
                Confirmar exclusão?
            </v-card-title>
            <v-card-actions>
                <v-btn @click="cancel()">Cancelar</v-btn>
                <v-btn color="error" @click="remove()">Excluir</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        props: {
            active: {
                required: true
            }
        },
        data() {
            return {
                isOpen: false
            }
        },
        methods: {
            cancel() {
                this.$emit('cancel')
            },
            remove() {
                this.$emit('remove')
            }
        },
        watch: {
            active: function (newVal, oldVal) {
                this.isOpen = !!newVal
            }
        }
    }
</script>