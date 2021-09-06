import { dashboardBaseUrl } from './baseUrls'

const Stocks = () => import(/* webpackChunkName: "stocks" */ '../views/stocks/StocksView.vue');
const ProuductsStock = () => import( /* webpackChunkName: "product-stocks" */ '../components/stocks/ProductsStockComponent.vue');
const IngredientsStock = () => import(/* webpackChunkName: "ingredients-stocks" */ '../components/stocks/IngredientsStockComponent.vue');

export default [
	{
		path: `${dashboardBaseUrl}/stocks`,
		name: 'Stocks',
		component: Stocks,
		meta: {
			breadcrumb: {
				label: 'Stocks',
				parent: 'Products'
			}
		},
		children: [
			{
				name: 'ProuductsStock',
				path: 'products/:barcode?',
				component: ProuductsStock,
				meta: {
					breadcrumb: {
						label: 'Product Stock',
					}
				}
			},
			{
				name: 'IngredientsStock',
				path: 'ingredients/:id?',
				component: IngredientsStock,
				meta: {
					breadcrumb: {
						label: 'Ingredient Stock',
					}
				}
			}
		],
	},

]