<template>
    <v-container fluid>
        <v-row align="center" class="mb-4">
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
                <v-sparkline :value="paddedReadingHistory" type="bar" auto-line-width/>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>Analysis</v-card-title>
                    <v-card-text>
                        <v-data-table :headers="analysisHeaders"
                                      :items="statsData"
                                      hide-default-footer
                        />
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import BaseStats from '@/stats/BaseStats';

function padArray(array, length, fill)
{
    return length > array.length ? array.concat(Array(length - array.length).fill(fill)) : array;
}

export default {
    name: 'Sensor',
    data: () => ({
        pollingInterval: null,
        shownReadings: 25,
        readingHistory: [],
        stats: [new BaseStats()],
        statsData: [],
        analysisHeaders: [
            {
                text: 'Name',
                align: 'start',
                value: 'name'
            },
            {text: 'Latest (cm)', value: 'latest'},
            {text: 'Mean (cm)', value: 'mean'},
            {text: 'Median (cm)', value: 'median'},
            {text: 'Min (cm)', value: 'min'},
            {text: 'Max (cm)', value: 'max'},
            {text: 'Stddev', value: 'stddev'}
        ]
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
        paddedReadingHistory()
        {
            return padArray(this.readingHistory.slice(-25).map(element => element.reading), 25, 0);
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
            if(this.sensor !== null && this.pollingInterval === null)
            {
                this.pollingInterval = this.sensor.interval;
            }
        },
        clearReadings()
        {
            this.readingHistory = [];
        }
    },
    watch: {
        sensor()
        {
            this.setPollingIntervalDefault();
        },
        'sensor.latestReading': function(newReading, oldReading)
        {
            if(newReading === null)
            {
                return;
            }

            this.readingHistory.push(newReading);
            if(this.readingHistory.length > 100)
            {
                this.readingHistory.shift();
            }

            for(const statConsumer of this.stats)
            {
                statConsumer.pushItem(newReading.reading);
            }
            this.statsData = this.stats.map(statConsumer => statConsumer.compute());
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
