import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Vuetify from 'vuetify/lib';
import localforage from 'localforage';
import VueNativeSock from 'vue-native-websocket';

Vue.config.productionTip = false;

Vue.use(VueNativeSock, 'ws://localhost:8090', {
    connectManually: true,
    store
});
Vue.use(Vuetify);

(async() =>
{
    let theme = await localforage.getItem('theme');
    if(!theme)
    {
        theme = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
    }
    
    new Vue({
        router,
        vuetify: new Vuetify({
            theme: {
                dark: theme !== 'light'
            }
        }),
        store,
        render: function(h)
        {
            return h(App);
        }
    }).$mount('#app');
})();
