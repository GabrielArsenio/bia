<template>
    <v-container fluid>
        <v-toolbar flat color="white">
            <v-toolbar-title>Processos segundo o nível de criticidade</v-toolbar-title>
        </v-toolbar>

        <v-list two-line subheader v-for="(item, index) in items" :key="index">

            <v-divider></v-divider>

            <v-subheader v-if="item.descricao" :key="item._id">
                {{ item.descricao }}
            </v-subheader>

            <v-list-item v-for="(processo) in item.processos" :key="processo._id">
                <v-list-item-content>
                    <v-list-item-title>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ processo.descricao }} - {{
                            processo.tolerancia
                    }}</v-list-item-title>
                    <!-- <v-list-item-sub-title>{{ processo.tolerancia }}</v-list-item-sub-title> -->
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
        this.service = new Service(this.$resource('api/processos-por-nivel{/id}'));

        this.service
            .findAll()
            .then(items => this.items = items);
    }
}
</script>