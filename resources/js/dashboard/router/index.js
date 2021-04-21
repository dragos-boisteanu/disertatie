import Vue from 'vue';
import VueRouter from 'vue-router';

const UsersListView = () => import(/* webpackChunkName: "group-users" */ '../views/users/UsersListView.vue');
const UserView = () => import(/* webpackChunkName: "group-users" */ '../views/users/UserView.vue');
const CreateUserView = () => import (/* webpackChunkName: "group-users" */ '../views/users/CreateUserView.vue');

const ProductsListView = () => import(/* webpackChunkName: "group-products" */ '../views/products/ProductsListView.vue');
const AddProductView = () => import(/* webpackChunkName: "group-products" */ '../views/products/AddProductView.vue');
const ProductView = () => import(/* webpackChunkName: "group-products" */ '../views/products/ProductView.vue');

const CategoriesView = () => import(/* webpackChunkName: "group-categories" */ '../views/categories/CategoriesView.vue');

const IngredientsView = () => import(/* webpackChunkName: "group-ingredients" */ '../views/ingredients/IngredientsView.vue')

const Stocks = () => import(/* webpackChunkName: "group-stocks" */ '../views/stocks/StocksView.vue');
const ProuductsStock = () => import( /* webpackChunkName: "group-stocks" */ '../components/stocks/ProductsStockComponent.vue');
const IngredientsStock = () => import (/* webpackChunkName: "group-stocks" */ '../components/stocks/IngredientsStockComponent.vue');

const Discounts = () => import(/* webpackChunkName: "group-discounts" */ '../views/discounts/DiscountsView.vue');

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
    },

    {   
        path: `${baseUrl}/categories`,
        name: 'Categories',
        component: CategoriesView,
        meta: {
            breadcrumb: {
                label: 'Categories',
                parent: 'Products'
            }
        }
    },

    {   
        path: `${baseUrl}/ingredients`,
        name: 'Ingredients',
        component: IngredientsView,
        meta: {
            breadcrumb: {
                label: 'Ingredients',
                parent: 'Products'
            }
        }
    },

    {
        path: `${baseUrl}/stocks`,
        name: 'Stocks',
        component: Stocks,
        children: [
            {
                name: 'ProuductsStock',
                path: 'products/:barcode?',
                component: ProuductsStock,
            },
            {
                name: 'IngredientsStock',
                path: 'ingredients/:id?',
                component: IngredientsStock,
            }
        ],
        meta: {
            breadcrumb: {
                label: 'Stocks',
                parent: 'Products'
            }
        }
    },

    {
        path: `${baseUrl}/products/:id`,
        name: 'Product',
        component: ProductView,
        meta: {
            breadcrumb: {
                label: 'Product',
                parent: 'Products',
            }
        }
    },

    {
        path: `${baseUrl}/products/:id/edit`,
        name: 'EditProduct',
        component: AddProductView,
        meta: {
            breadcrumb: {
                label: 'Edit product',
                parent: 'Product'
            }
        }
    },

    {
        path: `${baseUrl}/discounts`,
        name: 'Discounts',
        component: Discounts,
        meta: {
            breadcrumb: {
                label: 'Discounts',
                parent: 'Dashboard'
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