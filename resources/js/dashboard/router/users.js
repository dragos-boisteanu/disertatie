import { dashboardBaseUrl } from './baseUrls'

const UsersListView = () => import(/* webpackChunkName: "group-users" */ '../views/users/UsersListView.vue');
const UserView = () => import(/* webpackChunkName: "group-users" */ '../views/users/UserView.vue');
const CreateUserView = () => import (/* webpackChunkName: "group-users" */ '../views/users/CreateUserView.vue');
const EditUserView = () => import (/* webpackChunkName: "group-users" */ '../views/users/EditUserView.vue');

export default [
    {
        path: `${dashboardBaseUrl}/users`,
        name: 'Users',
        component: UsersListView,
        meta: {
            breadcrumb:  {
                label: 'Users',
                parent: 'Dashboard'
            }
        }
    },
    {
        path: `${dashboardBaseUrl}/users/create`,
        name: 'CreateUser',
        component: CreateUserView,
        meta: {
            requireLocationManager: true,
            requiredAdmin: true,
            requireWaiter: true,
            breadcrumb: {
                label: 'Create user account',
                parent: 'Users'
            }
        }
    },
    {
        path: `${dashboardBaseUrl}/users/:id`,
        name: 'User',
        component: UserView,
        meta: {
            breadcrumb() {
                const { params } = this.$route;
        
                return {
                    label: `User #${params.id}`,
                    parent: "Users",
                };
            },
        }
    },
    {
        path: `${dashboardBaseUrl}/users/:id/edit`,
        name: 'EditUser',
        component: EditUserView,
        requireLocationManager: true,
        requiredAdmin: true,
        requireWaiter: true,
        meta: {
            breadcrumb: {
                label: 'Edit',
                parent: 'User'
            }
        }
    }
]