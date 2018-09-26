<template>
    <div>
        <v-toolbar flat color="white">
            <v-toolbar-title>Processos segundo o nível de criticidade</v-toolbar-title>
        </v-toolbar>

        <v-list two-line subheader>
            <template v-for="(item, index) in items">

                <v-divider :key="index"></v-divider>

                <v-subheader
                    v-if="item.descricao"
                    :key="item._id"
                >
                    {{ item.descricao }}
                </v-subheader>

                <template v-for="(processo) in item.processos">
                    <v-list-tile avatar :key="processo._id">

                        <v-list-tile-content>
                            <v-list-tile-title>{{ processo.descricao }}</v-list-tile-title>
                            <v-list-tile-sub-title>{{ processo.tolerancia }}</v-list-tile-sub-title>
                        </v-list-tile-content>

                    </v-list-tile>
                </template>

            </template>

        </v-list>
    </div>
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