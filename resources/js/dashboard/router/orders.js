import { dashboardBaseUrl } from './baseUrls'

const OrdersViews = () => import(/* webpackChunkName: "group-orders" */ '../views/orders/OrdersView.vue')
const OrderView = () => import(/* webpackChunkName: "group-orders" */ '../views/orders/OrderView.vue')
const EditOrderView = () => import(/* webpackChunkName: "group-orders" */ '../views/orders/EditOrderView.vue')
const CreateOrderView = () => import(/* webpackChunkName: "group-orders" */ '../views/orders/CreateOrderView.vue')

export default [
    {   
        path: `${dashboardBaseUrl}/orders`,
        name: 'Orders',
        component: OrdersViews,
        meta: {
            breadcrumb: {
                label: 'Orders',
                parent: 'Dashboard'
            }
        }
    },

    {   
        path: `${dashboardBaseUrl}/orders/create`,
        name: 'CreateOrder',
        component: CreateOrderView,
        meta: {
            breadcrumb: {
                label: 'Create',
                parent: 'Orders'
            }
        }
    },

    {   
        path: `${dashboardBaseUrl}/order/:id`,
        name: 'Order',
        component: OrderView,
        meta: {
            breadcrumb: {
                label: 'Order',
                parent: 'Orders'
            }
        }
    },

    {   
        path: `${dashboardBaseUrl}/order/:id/edit`,
        name: 'EditOrder',
        component: EditOrderView,
        meta: {
            breadcrumb: {
                label: 'Edit',
                parent: 'Order'
            }
        }
    },
]