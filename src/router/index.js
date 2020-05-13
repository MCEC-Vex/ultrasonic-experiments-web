import Vue from 'vue';
import VueRouter from 'vue-router';
import Overview from '../views/Overview';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'overview',
        component: Overview
    }
];

const router = new VueRouter({
    routes
});

export default router;
