import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loggedIn: false,
        connectionLoading: false,
        connectionLost: false,
        connectionError: '',
        
        hasServo: false,
        servoPos: 0.0,
        sensors: []
    },
    mutations: {
        setPollRate(state, {sensor, enabled, interval, offset})
        {
            state.sensors[sensor].enabled = enabled;
            state.sensors[sensor].interval = interval;
            state.sensors[sensor].timingOffset = offset;
            
            this.$socket.send(JSON.stringify({
                type: 'pollrate',
                sensor, enabled, interval, offset
            }));
        },
        SOCKET_ONMESSAGE(state, message)
        {
            if(message.hasOwnProperty('type'))
            {
                if(message.type === 'capabilities')
                {
                    state.hasServo = message.hasServo;
                    state.sensors = message.sensors.map((offset) =>
                    {
                        return {
                            offset,
                            enabled: false,
                            interval: 0,
                            timingOffset: 0,
                            readings: [],
                            latestReading: null
                        };
                    });
                }
                else if(message.type === 'reading')
                {
                    state.sensors[message.sensor].latestReading = {
                        reading: message.data,
                        time: Date.now()
                    };
                    state.sensors[message.sensor].readings.unshift(message.data);
                    if(state.sensors[message.sensor].readings.length > 100)
                    {
                        state.sensors[message.sensor].readings.pop();
                    }
                }
            }
        },
        SOCKET_ONOPEN(state, event)
        {
            state.loggedIn = true;
            state.connectionLoading = false;
            state.connectionLost = false;
            this.$socket = event.target;
        },
        SOCKET_ONERROR(state)
        {
            state.connectionError = 'Connection error';
            state.connectionLoading = false;
        },
        SOCKET_ONCLOSE(state)
        {
            state.connectionError = 'Connection closed';
            state.connectionLost = true;
        },
        SOCKET_RECONNECT(state)
        {
            state.connectionLost = true;
        },
        beginConnectionLoading(state)
        {
            state.connectionError = '';
            state.connectionLoading = true;
        }
    },
    actions: {},
    modules: {}
});
