import { dashboardBaseUrl } from './baseUrls'

const Discounts = () => import(/* webpackChunkName: "group-discounts" */ '../views/discounts/DiscountsView.vue');

export default [
    {
        path: `${dashboardBaseUrl}/discounts`,
        name: 'Discounts',
        component: Discounts,
        meta: {
            requireLocationManager: true,
            requiredAdmin: true,
            breadcrumb: {
                label: 'Discounts',
                parent: 'Dashboard'
            }
        }
    }

]