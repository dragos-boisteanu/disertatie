import Vue from 'vue';
import VueRouter from 'vue-router';

const UsersListView = () => import(/* webpackChunkName: "group-users" */ '../views/users/UsersListView.vue');
const UserView = () => import(/* webpackChunkName: "group-users" */ '../views/users/UserView.vue');
const CreateUserView = () => import (/* webpackChunkName: "group-users" */ '../views/users/CreateUserView.vue');

const ProductsListView = () => import(/* webpackChunkName: "group-products" */ '../views/products/ProductsListView.vue');
const AddProductView = () => import(/* webpackChunkName: "group-products" */ '../views/products/AddProductView.vue');

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
        component: UsersListView,
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
    {
        path: `${baseUrl}/products`,
        name: 'Products',
        component: ProductsListView,
        meta: {
            breadcrumb: {
                label: 'Product lists',
                parent: 'Dashboard'
            }
        }
    },
    {
        path: `${baseUrl}/products/create`,
        name: 'AddProduct',
        component: AddProductView,
        meta: {
            breadcrumb: {
                label: 'Add new product',
                parent: 'Products'
            }
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