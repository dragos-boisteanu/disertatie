import { dashboardBaseUrl } from './baseUrls'

const IngredientsView = () => import(/* webpackChunkName: "group-ingredients" */ '../views/ingredients/IngredientsView.vue')

export default [
    {   
        path: `${dashboardBaseUrl}/ingredients`,
        name: 'Ingredients',
        component: IngredientsView,
        meta: {
            breadcrumb: {
                label: 'Ingredients',
                parent: 'Products'
            }
        }
    },
]