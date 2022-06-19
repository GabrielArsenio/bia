<template>
    <v-container fluid>
        <v-toolbar flat color="white">
            <v-toolbar-title>Ameaças aos processos</v-toolbar-title>
        </v-toolbar>

        <v-list two-line subheader v-for="(item, index) in items" :key="index">

            <v-divider></v-divider>

            <v-subheader v-if="item.descricao" :key="item._id">
                {{ item.descricao }}
            </v-subheader>

            <v-list-item v-for="(acao) in item.acoes" :key="acao._id">
                <v-list-item-content>
                    <v-list-item-title>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ acao.processo.descricao }} - {{
                            acao.processo.nivel.descricao
                    }} - {{ acao.processo.tolerancia }}</v-list-item-title>
                    <!-- <v-list-item-sub-title>{{ acao.processo.nivel.descricao }} - {{ acao.processo.tolerancia }}</v-list-item-sub-title> -->
                </v-list-item-content>
            </v-list-item>

        </v-list>
    </v-container>
</template>

<script>
import { Service } from '../../domain/Service'

export default {
    name: 'ProcessosPorNivel',
    data() {
        return {
            search: '',
            items: []
        }
    },
    created() {
        this.service = new Service(this.$resource('api/ameacas-aos-processos{/id}'));

        this.service
            .findAll()
            .then(items => this.items = items);
    }
}
</script>