import { dashboardBaseUrl } from './baseUrls'

const Stocks = () => import(/* webpackChunkName: "group-stocks" */ '../views/stocks/StocksView.vue');
const ProuductsStock = () => import( /* webpackChunkName: "group-stocks" */ '../components/stocks/ProductsStockComponent.vue');
const IngredientsStock = () => import (/* webpackChunkName: "group-stocks" */ '../components/stocks/IngredientsStockComponent.vue');

export default [
    {
        path: `${dashboardBaseUrl}/stocks`,
        name: 'Stocks',
        component: Stocks,
        children: [
            {
                name: 'ProuductsStock',
                path: 'products/:barcode?',
                component: ProuductsStock,
            },
            {
                name: 'IngredientsStock',
                path: 'ingredients/:id?',
                component: IngredientsStock,
            }
        ],
        meta: {
            breadcrumb: {
                label: 'Stocks',
                parent: 'Products'
            }
        }
    },

]