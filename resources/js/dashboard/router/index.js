import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/HomeView.vue';

const baseUrl = '/dashboard'
const routes = [
    {
        path: `${baseUrl}/`,
        name: 'Home',
        component: Home,
        meta: {
            breadcrumb: 'Home',
        }
    }
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
    routes,
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
});

Vue.use(VueRouter);

export default router;