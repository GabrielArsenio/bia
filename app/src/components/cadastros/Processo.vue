<tempale>
    <v-dialog v-model="processo" max-width="500px">
        <v-card>
            <v-card-title class="grey lighten-4 py-4 title">
                Novo processo
            </v-card-title>
            <v-container grid-list-sm class="pa-4">
                <v-layout row wrap>

                    <v-flex xs3>
                        <v-text-field placeholder="Código"></v-text-field>
                    </v-flex>

                    <v-flex xs12>
                        <v-text-field placeholder="Descricao"></v-text-field>
                    </v-flex>

                    <v-flex xs6>
                        <v-select placeholder="Nível" items="1"></v-select>
                    </v-flex>

                    <v-flex xs6>
                        <v-text-field placeholder="Tolerância"></v-text-field>
                    </v-flex>
                </v-layout>
            </v-container>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="processo = false">Cancelar</v-btn>
                <v-btn flat @click="processo = false">Salvar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</tempale>

<script>
    export default {
        data() {
            return {
                processo: null
            }
        }
    }
</script>

<style>
</style>