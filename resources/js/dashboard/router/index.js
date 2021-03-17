import Vue from 'vue';
import VueRouter from 'vue-router';

const UsersViewList = () => import(/* webpackChunkName: "group-users" */ '../views/users/UsersListView.vue');
const UserView = () => import(/* webpackChunkName: "group-users" */ '../views/users/UserView.vue');
const CreateUserView = () => import (/* webpackChunkName: "group-users" */ '../views/users/CreateUserView.vue');

const Home = () => import('../views/HomeView.vue');

const baseUrl = '/dashboard'
const routes = [
    {
        path: `${baseUrl}/`,
        name: 'Dashboard',
        component: Home,
        meta: {
            breadcrumb: 'Dashboard',
        },
    },
    {
        path: `${baseUrl}/users`,
        name: 'Users',
        component: UsersViewList,
        meta: {
            breadcrumb:  {
                label: 'Users',
                parent: 'Dashboard'
            }
        }
    },
    {
        path: `${baseUrl}/users/create`,
        name: 'CreateUser',
        component: CreateUserView,
        meta: {
            breadcrumb: {
                label: 'Create user account',
                parent: 'Users'
            }
        }
    },
    {
        path: `${baseUrl}/users/:id`,
        name: 'User',
        component: UserView,
        meta: {
            breadcrumb: {
                label: 'Profile',
                parent: 'Users'
            }
        }
    },
    
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