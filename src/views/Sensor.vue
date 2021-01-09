<template>
    <v-container fluid>
        <v-row align="center">
            <v-col md="4">
                <v-row align="center">
                    <v-col cols="6">
                        <v-text-field label="Polling Interval (ms)" type="number" v-model="pollingInterval"/>
                    </v-col>
                    <v-col>
                        <v-btn :color="(sensor === null || pollingInterval === sensor.interval) ? null : 'primary'"
                               elevation="2"
                               @click="setPollingInterval"
                        >
                            Apply
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-btn color="error" elevation="2" @click="clearReadings">
                            Clear Saved Readings
                        </v-btn>
                    </v-col>
                </v-row>
            </v-col>
            <v-col>
                <v-sparkline :value="reversedReadings" type="bars" auto-line-width/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
function padArray(array, length, fill)
{
    return length > array.length ? array.concat(Array(length - array.length).fill(fill)) : array;
}

export default {
    name: 'Sensor',
    data: () => ({
        pollingInterval: null,
        shownReadings: 25
    }),
    computed: {
        sensorIndex()
        {
            return Number(this.$route.params.id) - 1;
        },
        sensor()
        {
            if(this.sensorIndex >= 0 && this.sensorIndex < this.$store.state.sensors.length)
            {
                return this.$store.state.sensors[this.sensorIndex];
            }
            else
            {
                return null;
            }
        },
        reversedReadings()
        {
            const arr = (this.sensor === null) ? [] : this.sensor.readings.slice(0, this.shownReadings);
            return padArray(arr, this.shownReadings, 0).reverse();
        }
    },
    methods: {
        setPollingInterval()
        {
            this.$store.commit('setPollRate', {
                sensor: this.sensorIndex,
                enabled: true,
                interval: this.pollingInterval,
                offset: 0
            });
        },
        setPollingIntervalDefault()
        {
            console.log('Sensor is null? ' + (this.sensor === null));
            if(this.sensor !== null && this.pollingInterval === null)
            {
                this.pollingInterval = this.sensor.interval;
            }
        },
        clearReadings()
        {
            this.sensor.readings = [];
        }
    },
    watch: {
        sensor()
        {
            this.setPollingIntervalDefault();
        }
    },
    mounted()
    {
        this.setPollingIntervalDefault();
    }
}
</script>

<style scoped>

</style>
