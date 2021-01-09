import Vue from 'vue';
import VueRouter from 'vue-router';
import Overview from '@/views/Overview';
import Sensor from '@/views/Sensor';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'overview',
        component: Overview
    },
    {
        path: '/sensor/:id',
        name: 'sensor',
        component: Sensor
    }
];

const router = new VueRouter({
    routes
});

export default router;
