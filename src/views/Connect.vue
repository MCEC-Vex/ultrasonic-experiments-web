<template>
    <v-main>
        <v-container class="fill-height" fluid>
            <v-row align="center" justify="center" class="center-row-full">
                <v-col cols="12" sm="8" md="4">
                    <v-card class="elevation-12" :loading="loading">
                        <v-toolbar color="primary" dark flat>
                            <v-toolbar-title>Connect to ESP32</v-toolbar-title>
                        </v-toolbar>
                        <v-form @submit.prevent="connect">
                            <v-card-text>
                                <v-text-field v-model="ipaddress"
                                              label="ESP32 IP Address"
                                              name="ipaddress"
                                              prepend-icon="mdi-wifi"
                                              type="text"
                                              :disabled="loading"
                                />
                                <v-alert v-if="error" type="error">{{error}}</v-alert>
                            </v-card-text>
                            <v-card-actions>
                                <DarkSwitch class="ml-2"/>
                                <v-spacer/>
                                <v-btn type="submit" color="primary" :disabled="loading" :loading="loading">Connect</v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<script>
    import DarkSwitch from '../components/DarkSwitch';

    export default {
        name: 'Connect',
        components: {DarkSwitch},
        methods: {
            connect()
            {
                this.$store.commit('beginConnectionLoading');
                this.$connect('ws://' + this.ipaddress, {
                    format: 'json',
                    store: this.$store,
                    reconnection: true
                });
            }
        },
        data: () =>
        {
            return {
                ipaddress: ''
            };
        },
        computed: {
            loading()
            {
                return this.$store.state.connectionLoading;
            },
            error()
            {
                return this.$store.state.connectionError;
            }
        }
    };
</script>

<style scoped>
    .center-row-full
    {
        max-width: none !important;
    }
</style>
