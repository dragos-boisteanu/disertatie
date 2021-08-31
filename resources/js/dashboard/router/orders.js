import { dashboardBaseUrl } from './baseUrls'

const OrdersViews = () => import(/* webpackChunkName: "orders-list" */ '../views/orders/OrdersView.vue')
const OrderView = () => import(/* webpackChunkName: "orders-show" */ '../views/orders/OrderView.vue')
const CreateOrderView = () => import(/* webpackChunkName: "orders-view" */ '../views/orders/CreateOrderView.vue')
const IndexView = () => import(/* webpackChunkName: "orders-index" */ '../views/orders/IndexView.vue')

export default [
	{
		path: `${dashboardBaseUrl}/orders`,
		name: 'Orders',
		component: IndexView,
		children: [
			{
				path: "",
				name: 'Orders',
				component: OrdersViews,
				meta: {
					breadcrumb: {
						label: 'Orders',
						parent: 'Dashboard'
					}
				},
			},

			{
				path: `create`,
				name: 'CreateOrder',
				component: CreateOrderView,
				meta: {
					requireWaiter: true,
					breadcrumb: {
						label: 'Create',
						parent: 'Orders'
					}
				}
			},

			{
				path: `:id`,
				name: 'Order',
				component: OrderView,
				meta: {
					breadcrumb() {
						const { params } = this.$route;

						return {
							label: `Order #${params.id}`,
							parent: "Orders",
						};
					},
				}
			},
		]
	},
]