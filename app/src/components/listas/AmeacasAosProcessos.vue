<template>
    <div>
        <v-toolbar flat color="white">
            <v-toolbar-title>Ameaças aos processos</v-toolbar-title>
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

                <template v-for="(acao) in item.acoes">
                    <v-list-tile avatar :key="acao._id">

                        <v-list-tile-content>
                            <v-list-tile-title>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ acao.processo.descricao }} - {{ acao.processo.nivel.descricao }} - {{ acao.processo.tolerancia }}</v-list-tile-title>
                            <!-- <v-list-tile-sub-title>{{ acao.processo.nivel.descricao }} - {{ acao.processo.tolerancia }}</v-list-tile-sub-title> -->
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
            this.service = new Service(this.$resource('api/ameacas-aos-processos{/id}'));

            this.service
                .findAll()
                .then(items => this.items = items);
        }
    }
</script>