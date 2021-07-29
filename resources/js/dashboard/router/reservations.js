import { dashboardBaseUrl } from './baseUrls'

const ReservationsList = () => import(/* webpackChunkName: "reservations-list" */ '../views/reservations/Index.vue');
const ReservationView = () => import(/* webpackChunkName: "reservations-show" */ '../views/reservations/Show.vue')
const ReservationCreate = () => import(/* webpackChunkName: "reservations-create" */ '../views/reservations/Create.vue');

export default [
  {
    path: `${dashboardBaseUrl}/reservations`,
    name: 'Reservations',
    component: ReservationsList,
    meta: {
      breadcrumb: {
        label: 'Reservations',
        parent: 'Dashboard'
      }
    }
  },
  {
    path: `${dashboardBaseUrl}/reservations/create`,
    name: 'ReservationCreate',
    component: ReservationCreate,
    meta: {
      breadcrumb: {
        label: 'Create new reservation',
        parent: 'Reservations'
      }
    }
  },
  
  {
    path: `${dashboardBaseUrl}/reservations/:id`,
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
  
]