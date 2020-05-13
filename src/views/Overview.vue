<template>
    <v-container fluid>
        <v-row>
            <v-col class="text-center">
                <h3>{{latestReading}}</h3>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="text-center">
                <v-btn @click="resetPollRate">Set Polling Rates</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: 'Overview',
        computed: {
            latestReading()
            {
                if(this.$store.state.sensors.length > 0 && this.$store.state.sensors[0].readings.length > 0)
                {
                    return this.$store.state.sensors[0].readings[0];
                }
                else
                {
                    return 0;
                }
            }
        },
        methods: {
            resetPollRate()
            {
                for(let i = 0; i < this.$store.state.sensors.length; i++)
                {
                    this.$store.commit('setPollRate', {
                        sensor: i,
                        enabled: true,
                        interval: 100,
                        offset: 0
                    });
                }
            }
        }
    };
</script>

<style scoped>

</style>
