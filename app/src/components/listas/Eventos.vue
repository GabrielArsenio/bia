<template>
    <div>
        <v-stepper v-model="stepper" vertical>
            <v-stepper-step :complete="stepper > 1" step="1">
                Processo de despache de bagagem
                <small>Ameaça no setor de coleta</small>
            </v-stepper-step>
            <v-stepper-step :complete="stepper > 2" step="2">
                Processo de Recebimento de carga
                <small>Queda de energia</small>
            </v-stepper-step>
            <v-stepper-step :complete="stepper > 3" step="3">
                Controle de vôo
                <small>Objeto invadindo o espaço aéreo</small>
            </v-stepper-step>
        </v-stepper>        
    </div>
</template>

<script>
    export default {
        data() {
            return {
                stepper: 1
            }
        }
    }
</script>