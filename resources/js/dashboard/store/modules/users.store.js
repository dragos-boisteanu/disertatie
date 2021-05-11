import {downloadLoggedUserData, downloadUsers, downloadUser, storeUser, patchUser,  disableUser, restoreUser, deleteUser, downloadUserByPhoneNumber } from '../../api/users.api';
import _orderBy from 'lodash/orderBy';
import _find from 'lodash/find';
import _findIndex from 'lodash/findIndex';

const initialState = () => ({
    users: [],
    nextPage: 1,
    loggedUser: null,
    filtered: false,
});

const state = initialState();

const getters = {
    getUsers (state) {
        return state.users; 
    },

    getLoggedUser(state) {
        return state.loggedUser;
    },

    getNextPage(state) {
        return state.nextPage;
    },

    getFilteredState(state) {
        return state.filtered;
    }
   
}

const actions = {
    reset({ commit }) {
        commit('RESET');
    },

    setFilteredState({commit}, payload) {
        commit('SET_FILTERED_STATE', payload);
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

    async downloadUserByPhoneNumber({}, payload) {
        try {
            const response = await downloadUserByPhoneNumber(payload);
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

    SET_FILTERED_STATE(state, payload) {
        state.filtered = payload;
    },

    SET_LOGGED_USER(state, payload) {
        state.loggedUser = payload;
    },

    SET_USERS(state, users) {
        state.users = users;
    },

    ADD_USERS(state, users) {
        state.users.push(...users);
    },

    REFRESH_USERS(state, users) {
        state.users = users;
        state.nextPage = 2;
    },

    ADD_USER(state, user) {
        state.users.unshift(user);
    },
    
    PATCH_USER(state, payload) {
        if(state.users.length > 0) {
            const selectedUserIndex = _.findIndex(state.users, ['id', payload.user.id]);
            const vm = payload.vm;
            Object.keys(payload.user).forEach(key => {
                vm.$set(state.users[selectedUserIndex], key, payload.user[key])
            })
        }
        
    },

    UPDATE_USER_STATUS(state, payload) {
        if(state.users.length > 0) {
            const selectedUserIndex = _.findIndex(state.users, ['id', payload.id]);
            const vm = payload.vm;
            vm.$set(state.users[selectedUserIndex], 'deleted_at', payload.deleted_at);
        }
    },

    DELETE_USER(state, payload) {
        if(state.users.length > 0) {
            const selectedUserIndex = _.findIndex(state.users, ['id', payload]);
            state.users.splice(selectedUserIndex, 1);
        }
    },

    SAVE_NEXT_PAGE(state, page) {
        state.nextPage = page;
    },

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}