import { dashboardBaseUrl } from './baseUrls'

const CategoriesView = () => import(/* webpackChunkName: "group-categories" */ '../views/categories/CategoriesView.vue');

export default [
	{
		path: `${dashboardBaseUrl}/categories`,
		name: 'Categories',
		component: CategoriesView,
		meta: {
			requireLocationManager: true,
			breadcrumb: {
				label: 'Categories',
				parent: 'Products'
			}
		}
	},
]