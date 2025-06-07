<template>
    <Form @submit="save" :validation-schema="schema" v-slot="{ handleSubmit }">
        <v-dialog v-model="isOpen" max-width="500px" persistent>
            <v-card>
                <v-card-title class="grey lighten-4 py-4 title">
                    Evento
                </v-card-title>
                <v-container class="pa-4"> <!-- Removed grid-list-sm -->
                    <v-row> <!-- Replaced v-layout -->
                        <v-col cols="6"> <!-- Corrected from cols="12" lg="6" to cols="6" (implicit lg="6") -->
                            <Field name="dateFormatted" v-model="dateFormatted" v-slot="{ field, errors }">
                                <v-menu
                                    ref="menu1"
                                    :close-on-content-click="false"
                                    v-model="menu1"
                                    :nudge-right="40"
                                    lazy
                                    transition="scale-transition"
                                    offset-y
                                    full-width
                                    max-width="290px"
                                    min-width="290px"
                                >
                                    <template v-slot:activator="{ props: menuProps }"> <!-- Vuetify 3 slot syntax -->
                                        <v-text-field
                                            label="Data"
                                            v-bind="field"
                                            v-on="menuProps.on" <!-- Ensure menu activator events are bound if props has on -->
                                            :attrs="menuProps.attrs" <!-- Ensure menu activator attrs are bound -->
                                            persistent-hint
                                            prepend-icon="event"
                                            @blur="date = parseDate(dateFormatted)"
                                            :error-messages="errors"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        v-model="date"
                                        no-title
                                        @input="menu1 = false; dateFormatted = formatDate(date);"
                                        locale="pt-br"
                                    ></v-date-picker>
                                </v-menu>
                            </Field>
                            <ErrorMessage name="dateFormatted" class="red--text text--darken-1 caption"/>
                        </v-col>

                        <v-col cols="6" sm="5"> <!-- Corrected from cols="12" sm="5" to cols="6" sm="5" -->
                            <Field name="timeValue" v-model="time" v-slot="{ field, errors }"> <!-- Changed name to avoid conflict with time property -->
                                <v-menu
                                    ref="menu"
                                    :close-on-content-click="false"
                                    v-model="menu2"
                                    :nudge-right="40"
                                    v-model:return-value="time"
                                    lazy
                                    transition="scale-transition"
                                    offset-y
                                    full-width
                                    max-width="290px"
                                    min-width="290px"
                                >
                                    <template v-slot:activator="{ props: menuProps }"> <!-- Vuetify 3 slot syntax -->
                                        <v-text-field
                                            label="Hora"
                                            v-bind="field"
                                            v-on="menuProps.on"
                                            :attrs="menuProps.attrs"
                                            prepend-icon="access_time"
                                            readonly
                                            :error-messages="errors"
                                        ></v-text-field>
                                    </template>
                                    <v-time-picker
                                        v-if="menu2"
                                        v-model="time"
                                        format="24hr"
                                        @change="$refs.menu.save(time)"
                                    ></v-time-picker>
                                </v-menu>
                            </Field>
                            <ErrorMessage name="timeValue" class="red--text text--darken-1 caption"/>
                        </v-col>

                        <v-col cols="12"> <!-- Replaced v-flex xs12 -->
                            <v-text-field
                                label="Processo"
                                :value="tempDocument.acao.processo.descricao"
                                readonly
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12"> <!-- Replaced v-flex xs12 -->
                            <v-text-field
                                label="Ameaça"
                                :value="tempDocument.acao.ameaca.descricao"
                                readonly
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12"> <!-- Replaced v-flex xs12 -->
                            <v-textarea
                                label="Procedimento"
                                :value="tempDocument.acao.procedimento"
                                readonly
                            ></v-textarea>
                        </v-col>

                        <v-col cols="12"> <!-- Replaced v-flex xs12 -->
                            <Field name="descricao" v-model="tempDocument.descricao" v-slot="{ field, errors }">
                                <v-text-field
                                    label="Descrição"
                                    v-bind="field"
                                    :error-messages="errors"
                                ></v-text-field>
                            </Field>
                            <ErrorMessage name="descricao" class="red--text text--darken-1 caption"/>
                        </v-col>
                    </v-row> <!-- Closed v-row -->
                </v-container>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat @click="cancel()">Cancelar</v-btn>
                    <v-btn flat color="primary" @click="handleSubmit">Salvar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </Form>
</template>

<script>
    import { Service } from '../../domain/Service';
    import { Form, Field, ErrorMessage } from 'vee-validate';
    import * as yup from 'yup';

    export default {
        components: { Form, Field, ErrorMessage },
        props: {
            document: {
                required: true
            }
        },
        data() {
            const schema = yup.object({
                dateFormatted: yup.string().required('A data é obrigatória.'),
                timeValue: yup.string().required('A hora é obrigatória.'), // Validating the model 'time'
                descricao: yup.string().required('A descrição é obrigatória.'),
            });
            return {
                isOpen: false,
                tempDocument: {
                    acao: {
                        processo: { descricao: '' },
                        ameaca: { descricao: '' }
                    },
                    descricao: '' // Ensure tempDocument.descricao is initialized
                },
                acoes: [],
                menu1: false,
                dateFormatted: null,
                date: null, // This will be set by the date picker
                time: null,  // This will be set by the time picker
                menu2: false,
                schema
            };
        },
        computed: {
            computedDateFormatted () {
                return this.formatDate(this.date)
            },
            dataHoraFormatted () {
                if (!this.tempDocument.dataHora) {
                    return null
                }

                const dataHora = this.tempDocument.dataHora

                const [day, month, year, hour, minute] = [
                    dataHora.getDate(),
                    dataHora.getMonth() + 1,
                    dataHora.getFullYear(),
                    dataHora.getHours(),
                    dataHora.getMinutes()
                ];                

                return `${day}/${month}/${year} ${hour}:${minute}`
            }
        },
        watch: {
            document: function (newVal, oldVal) {
                if (!this.document) {
                    this.isOpen = false;
                }

                if (typeof this.document === 'object') {
                    this.isOpen = true
                    this.tempDocument = Object.assign({}, this.document)

                    this.tempDocument.dataHora = new Date()
                }
            },
            date (val) {
                this.dateFormatted = this.formatDate(this.date); // Update formatted date when date model changes
            },
            // tempDocumentDescricao(val) { // Watch for direct changes to tempDocument.descricao if needed
            //     this.formValues.descricao = val;
            // }
        },
        methods: {
            formatDate (date) {
                if (!date) return null;
                // Ensure date is in 'YYYY-MM-DD' for splitting, or handle various formats
                const parts = String(date).split('-');
                if (parts.length === 3) {
                    const [year, month, day] = parts;
                    return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
                }
                return date; // return as is if not in expected format
            },
            parseDate (dateFormatted) {
                if (!dateFormatted) return null;
                const parts = dateFormatted.split('/');
                if (parts.length === 3) {
                    const [day, month, year] = parts;
                    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
                }
                return dateFormatted; // return as is if not in expected format
            },
            cancel() {
                this.$emit('cancel');
                // Optionally reset form with VeeValidate v4: this.$refs.observer.reset(); (if Form has ref="observer")
            },
            save() { // This method is called by Form's submit event
                // tempDocument.data and tempDocument.hora are already set by date/time pickers
                // and their respective v-models or update events.
                // Ensure they are correctly populated before saving.
                this.tempDocument.data = this.date;
                this.tempDocument.hora = this.time;

                new Service('api/eventos')
                    .save(this.tempDocument)
                    .then(responseData => this.$emit('save', responseData || this.tempDocument));
            }
        },
        watch: { // Keep existing watch for document prop
            document: function (newVal) {
                if (!this.document) {
                    this.isOpen = false;
                    return;
                }
                if (typeof this.document === 'object') {
                    this.isOpen = true;
                    this.tempDocument = Object.assign({}, this.document, {
                        // Ensure descricao is initialized for the Field component if not present
                        descricao: this.document.descricao || ''
                    });
                    this.tempDocument.dataHora = new Date(); // This seems to be for display, not direct form input

                    // Initialize date/time fields for the form if needed from tempDocument
                    // For example, if tempDocument can have existing date/time:
                    // this.date = this.tempDocument.data; // Assuming tempDocument.data is in YYYY-MM-DD
                    // this.time = this.tempDocument.hora;
                    // this.dateFormatted = this.formatDate(this.date);
                }
            },
            date (val) {
                this.dateFormatted = this.formatDate(val);
                 // If using VeeValidate's Field with v-model="date", it should update.
                 // If Field is bound to dateFormatted, ensure dateFormatted is updated to reflect changes to 'date'.
            },
            time(val) {
                // If Field for time is bound to 'time', this watcher might not be strictly necessary
                // for validation itself, but can be useful for other logic.
            }
        }
    }
</script>