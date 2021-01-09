<template>
    <v-app>
        <template v-if="$store.state.loggedIn">
            <v-navigation-drawer
                    v-model="drawer"
                    :clipped="$vuetify.breakpoint.lgAndUp"
                    app
            >
                <v-list nav>
                    <v-list-item link :to="{name: 'overview'}" exact>
                        <v-list-item-icon>
                            <v-icon>mdi-view-dashboard</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Overview</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>

                <template v-slot:append>
                    <v-row justify="center" class="pb-4">
                        <dark-switch/>
                    </v-row>
                </template>
            </v-navigation-drawer>

            <v-app-bar
                    app
                    :clipped-left="$vuetify.breakpoint.lgAndUp"
                    color="primary"
            >
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

                <div class="d-flex align-center">
                    <v-toolbar-title>
                        Ultrasonic Experiments
                    </v-toolbar-title>
                </div>
            </v-app-bar>

            <v-main>
                <!-- Loading dialog for when connection is lost -->
                <v-dialog
                        v-model="$store.state.connectionLost"
                        hide-overlay
                        persistent
                        width="300"
                >
                    <v-card color="primary" dark>
                        <v-card-text>
                            Connection lost, trying to reconnect...
                            <v-progress-linear indeterminate color="white" class="mb-0"/>
                        </v-card-text>
                    </v-card>
                </v-dialog>

                <router-view/>
            </v-main>
        </template>
        <!-- Show the connection box if not yet connected -->
        <template v-else>
            <Connect/>
        </template>
    </v-app>
</template>

<script>
    import Connect from './views/Connect';
    import DarkSwitch from './components/DarkSwitch';

    export default {
        name: 'App',
        components: {Connect, DarkSwitch},
        data: () => ({
            drawer: null
        })
    };
</script>
