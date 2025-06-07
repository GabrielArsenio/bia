<template>
    <v-container fluid>
        <v-toolbar variant="flat" color="white"> <!-- Replaced flat -->
            <v-toolbar-title>Ameaças aos processos</v-toolbar-title>
        </v-toolbar>

        <!-- The v-for on v-list is unusual. Consider if a single list with grouped items is better. -->
        <!-- Assuming subheader and two-line implies a denser list, using density="compact". -->
        <!-- two-line and subheader props removed from v-list as they are V2. -->
        <v-list density="compact" v-for="(item, index) in items" :key="index">

            <v-divider></v-divider>

            <v-list-subheader v-if="item.descricao" :key="item._id"> <!-- v-subheader to v-list-subheader -->
                {{ item.descricao }}
            </v-list-subheader>

            <v-list-item v-for="(acao) in item.acoes" :key="acao._id"
                :title="`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0${acao.processo.descricao} - ${acao.processo.nivel.descricao} - ${acao.processo.tolerancia}`">
                <!-- Removed v-list-item-content and v-list-item-title, using title prop -->
                <!-- \u00A0 is unicode for &nbsp; -->
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
        this.service = new Service('api/ameacas-aos-processos');

        this.service
            .findAll()
            .then(items => this.items = items);
    }
}
</script>