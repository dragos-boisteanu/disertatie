import { dashboardBaseUrl } from './baseUrls'

const TablesListView = () => import(/* webpackChunkName: "group-tables" */ '../views/tables/TablesView.vue');

export default [
	{
		path: `${dashboardBaseUrl}/tables`,
		name: 'Tables',
		component: TablesListView,
		meta: {
			requireLocationManager: true,
			breadcrumb: {
				label: 'Tables',
				parent: 'Dashboard'
			}
		}
	},
]