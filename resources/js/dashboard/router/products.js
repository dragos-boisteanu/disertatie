import { dashboardBaseUrl } from './baseUrls'

const ProductsListView = () => import(/* webpackChunkName: "products-list" */ '../views/products/ProductsListView.vue');
const AddProductView = () => import(/* webpackChunkName: "products-create" */ '../views/products/AddProductView.vue');
const EditProductView = () => import(/* webpackChunkName: "products-edit" */ '../views/products/EditProductView.vue');
const ProductView = () => import(/* webpackChunkName: "products-view" */ '../views/products/ProductView.vue');
const IndexView = () => import(/* webpackChunkName: "products-index" */ '../views/products/IndexView.vue');

export default [
	{
		path: `${dashboardBaseUrl}/products`,
		component: IndexView,
		meta: {
			breadcrumb: {
				label: 'Products',
				parent: 'Dashboard'
			}
		},
		children: [
			{
				path: "",
				name: 'Products',
				component: ProductsListView,
			},
			{
				path: `create`,
				name: 'AddProduct',
				component: AddProductView,
				meta: {
					requireLocationManager: true,
					breadcrumb: {
						label: 'Add new product',
						parent: 'Products'
					}
				}
			},

			{
				path: `:id`,
				name: 'Product',
				component: ProductView,
				meta: {
					breadcrumb() {
						const { params } = this.$route;

						return {
							label: `Product #${params.id}`,
							parent: "Products",
						};
					}
				}
			},

			{
				path: `:id/edit`,
				name: 'EditProduct',
				component: EditProductView,
				meta: {
					requireLocationManager: true,
					requiredAdmin: true,
					requireKitchenManager: true,
					requireWaiter: true,
					breadcrumb: {
						label: 'Edit',
						parent: 'Product'
					}
				}
			},
		]
	},

]