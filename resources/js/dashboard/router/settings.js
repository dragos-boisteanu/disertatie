import { dashboardBaseUrl } from './baseUrls'

const SettingsView = () => import(/* webpackChunkName: "settings-notification" */ '../views/Settings.vue');

export default [
	{
		path: `${dashboardBaseUrl}/settings`,
		name: 'Settings',
		component: SettingsView,
		meta: {
			breadcrumb: {
				label: 'Settings',
				parent: 'Dashboard'
			}
		}
	}
]