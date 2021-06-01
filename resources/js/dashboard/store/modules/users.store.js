import {downloadLoggedUserData, downloadUsers, downloadUser, storeUser, patchUser,  disableUser, restoreUser, deleteUser } from '../../api/users.api';
import _orderBy from 'lodash/orderBy';
import _find from 'lodash/find';
import _findIndex from 'lodash/findIndex';

const initialState = () => ({
    loggedUser: null,
});

const state = initialState();

const getters = {
    getLoggedUser(state) {
        return state.loggedUser;
    },

    isAdmin(state) {
        return state.loggedUser.role.name === "Administrator";
    },

    isLocationManager(state) {
        return state.loggedUser.role.name === "Location Manager";
    },

    isWaiter(state) {
        return state.loggedUser.role.name === "Waiter";
    },

    isKitchenManager(state) {
        return state.loggedUser.role.name === "Kitchen Manager";
    },

    isDelivery(state) {
        return state.loggedUser.role.name === "Delivery";
    },

    isKitchen(state) {
        return state.loggedUser.role.name === "Kitchen";
    },
   
}

const actions = {
    resetUser({ commit }) {
        commit('RESET');
    },

     async downloadLoggedUserData({commit}) {
        try {
            const response = await downloadLoggedUserData();
            commit('SET_LOGGED_USER', response.data.data);
        } catch (error) {
            throw error
        } 
    },

    async fetchUsers({commit}, query) {
        try {
            const response = await downloadUsers(query);
            const users = response.data.data.users;
            const links = response.data.links;
            commit('SET_USERS', users );

            if(links.next) {
                const lastIndex = links.next.indexOf('=');
                commit('SAVE_NEXT_PAGE', links.next.substr(lastIndex+1));
            }else {
                commit('SAVE_NEXT_PAGE', null);
            }

        } catch (error) {
            throw error; 
        }
    },

    async fetchMoreUsers({commit}, query) {
        try {
            const response = await downloadUsers(query);

            const users = response.data.data.users;
            const links = response.data.links;

            commit('ADD_USERS', users );

            if(links.next) {
                const lastIndex = links.next.indexOf('=');
                commit('SAVE_NEXT_PAGE', links.next.substr(lastIndex+1));
            }else {
                commit('SAVE_NEXT_PAGE', null);
            }
            
        } catch ( error ) {
            throw error;
        }
    },
    
    async refreshUsers({commit}) {
        try {
            const response = await downloadUsers(1);
            commit('REFRESH_USERS', response.data.data.users);

            const links = response.data.links;

            if(links.next) {
                commit('SAVE_NEXT_PAGE', links.next.substr(links.next.length-1));
            }else {
                commit('SAVE_NEXT_PAGE', null);
            }    
            
        } catch (error) {
            throw error; 
        }
    },

    async addUser({commit}, payload) {
        try {
            const response = await storeUser(payload);
            payload.user.id = response.data.user.id;
            payload.user.created_at = response.data.user.created_at;
            payload.user.deleted_at = null;
            commit('ADD_USER', payload.user)
        } catch (error) {
            throw error;
        }
    },

    async updateUser({commit}, payload) {
        try {
            const response = await patchUser(payload.user);
            payload.user.avatar = response.data.avatar;
            commit('PATCH_USER', payload);
            return response;
        } catch (  error ) {
            throw error
        }
    },

    async fetchUser({}, id) {
        try {
            const response = await downloadUser(id);
            return response.data.data;
        } catch ( error ) {
            throw error
        }
    },
    
    async getUser({state, dispatch }, id) {
        try {
            let user = _.find(state.users, ['id', id]);
            if(user) {
                return user;
            }
            return dispatch('fetchUser', id);
        } catch ( error ) {
            throw error
        }
    },

    async disableUser({commit}, payload) {
        try {
            const response = await disableUser(payload.id);
            payload.deleted_at = response.data.deleted_at;
            commit('UPDATE_USER_STATUS', payload);
            return response.data;
        } catch ( error ) {
            throw error
        }
    },

    async restoreUser({commit}, payload) {
        try {
            const response = await restoreUser(payload.id);
            payload.deleted_at = response.data.deleted_at;
            commit('UPDATE_USER_STATUS', payload);
            return response.data;
        } catch ( error ) {
            throw error
        }
    },

    async deleteUser({commit}, payload) {
        try {
            const response = await deleteUser(payload);
            commit('DELETE_USER', payload);
            return response.message;
        } catch ( error ) {
            throw error
        }
    },
    
}

const mutations = {
    RESET(state) {
        const newState = initialState();
        Object.keys(newState).forEach(key => {
            state[key] = newState[key]
        })
    },

    SET_LOGGED_USER(state, payload) {
        state.loggedUser = payload;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}