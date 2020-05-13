import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import VueNativeSock from 'vue-native-websocket';

Vue.config.productionTip = false;

Vue.use(VueNativeSock, 'ws://localhost:8090', {
    connectManually: true,
    store
});

new Vue({
    router,
    store,
    vuetify,
    render: function(h)
    {
        return h(App);
    }
}).$mount('#app');
