import { dashboardBaseUrl } from './baseUrls'

const ReservationsList = () => import(/* webpackChunkName: "reservations-list" */ '../views/reservations/ReservationsList.vue');
const ReservationView = () => import(/* webpackChunkName: "reservations-show" */ '../views/reservations/Reservation.vue')
const ReservationCreate = () => import(/* webpackChunkName: "reservations-create" */ '../views/reservations/ReservationCreate.vue');
const IndexView = () => import(/* webpackChunkName: "reservations-index" */ '../views/reservations/IndexView.vue');

export default [
	{
		path: `${dashboardBaseUrl}/reservations`,
		name: 'Reservations',
		component: IndexView,
		meta: {
			breadcrumb: {
				label: 'Reservations',
				parent: 'Dashboard'
			}
		},
		children: [
			{
				path: "",
				name: 'Reservations',
				component: ReservationsList,
			},
			{
				path: `create`,
				name: 'ReservationCreate',
				component: ReservationCreate,
				meta: {
					requireWaiter: true,
					breadcrumb: {
						label: 'Create new reservation',
						parent: 'Reservations'
					}
				}
			},

			{
				path: `:id`,
				name: 'Reservation',
				component: ReservationView,
				meta: {
					breadcrumb() {
						const { params } = this.$route;

						return {
							label: `Reservation #${params.id}`,
							parent: 'Reservations'
						}
					}
				}
			},
		],
	},


]