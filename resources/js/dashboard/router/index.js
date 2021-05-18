import Vue from 'vue';
import VueRouter from 'vue-router';

import store from '../store/index'


const Home = () => import('../views/HomeView.vue');


import usersRoutes from './users'
import productsRoutes from './products'
import categoriesRoutes from './categories'
import stocksRoutes from './stocks'
import ingredientsRoutes from './ingredients'
import discountsRoutes from './discounts'
import ordersRoutes from './orders'

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
    ...ordersRoutes    
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
    routes,
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
});

router.beforeEach( async (to, from, next) => {

    if(store.getters['Users/getLoggedUser'] === null) {
        console.log('here')
        await store.dispatch('Users/downloadLoggedUserData');
    }

    const isAdmin = store.getters['Users/isAdmin'];
    const isLocationManager = store.getters['Users/isLocationManager'];
    const isWaiter = store.getters['Users/isWaiter'];
    // const isKitchenManager = store.getters['Users/isKitchenManager'];
    // const isDelivery = store.getters['Users/isDelivery'];
    // const isKitchen = store.getters['Users/isKitchen'];

    const requireAdmin = to.matched.some((record) => record.meta.requireAdmin);
    const requireLocationManager  = to.matched.some((record) => record.meta.requireLocationManager);
    const requireWaiter = to.matched.some((record) => record.meta.requireWaiter);
    // const requireDelivery = to.matched.some((record) => record.meta.requireDelivery);
    // const requireKitchen = to.matched.some((record) => record.meta.requireKitchen);

    if (requireAdmin || requireLocationManager || requireWaiter) {
        if (isAdmin || isLocationManager || isWaiter) {
          next();
        } else {
          next({ name: "Dashboard" });
        }
    } else {
        next();
    } 
})

Vue.use(VueRouter);

export default router;