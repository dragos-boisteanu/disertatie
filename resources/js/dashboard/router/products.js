import { dashboardBaseUrl } from './baseUrls'

const ProductsListView = () => import(/* webpackChunkName: "group-products" */ '../views/products/ProductsListView.vue');
const AddProductView = () => import(/* webpackChunkName: "group-products" */ '../views/products/AddProductView.vue');
const EditProductView = () => import(/* webpackChunkName: "group-products" */ '../views/products/EditProductView.vue');
const ProductView = () => import(/* webpackChunkName: "group-products" */ '../views/products/ProductView.vue');


export default [ 
    {
        path: `${dashboardBaseUrl}/products`,
        name: 'Products',
        component: ProductsListView,
        meta: {
            breadcrumb: {
                label: 'Products',
                parent: 'Dashboard'
            }
        }
    },
    
    {
        path: `${dashboardBaseUrl}/products/create`,
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
        path: `${dashboardBaseUrl}/products/:id`,
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
        path: `${dashboardBaseUrl}/products/:id/edit`,
        name: 'EditProduct',
        component: EditProductView,
        meta: {
            breadcrumb: {
                label: 'Edit product',
                parent: 'Product'
            }
        }
    },
]