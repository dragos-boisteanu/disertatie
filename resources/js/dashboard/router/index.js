import Vue from 'vue';
import VueRouter from 'vue-router';



const Home = () => import('../views/HomeView.vue');


import usersRoutes from './users'
import productsRoutes from './products'
import categoriesRoutes from './categories'
import stocksRoutes from './stocks'
import ingredientsRoutes from './ingredients'
import discountsRoutes from './discounts'

import { dashboardBaseUrl } from './baseUrls'

const routes = [
    {
        path: `${dashboardBaseUrl}/`,
        name: 'Dashboard',
        component: Home,
        meta: {
            breadcrumb: 'Dashboard',
        },
    },
    ...usersRoutes,
    ...productsRoutes,
    ...categoriesRoutes,
    ...stocksRoutes,
    ...ingredientsRoutes,
    ...discountsRoutes,        
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