import { dashboardBaseUrl } from './baseUrls'

const IngredientsView = () => import(/* webpackChunkName: "group-ingredients" */ '../views/ingredients/IngredientsView.vue')

export default [
    {   
        path: `${dashboardBaseUrl}/ingredients`,
        name: 'Ingredients',
        component: IngredientsView,
        meta: {
            requireLocationManager: true,
            requiredAdmin: true,
            breadcrumb: {
                label: 'Ingredients',
                parent: 'Products'
            }
        }
    },
]