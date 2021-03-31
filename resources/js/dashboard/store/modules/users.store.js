import {downloadLoggedUserData, downloadUsers, downloadUser, storeUser, patchUser,  disableUser, restoreUser, deleteUser } from '../../api/users.api';
import _orderBy from 'lodash/orderBy';
import _find from 'lodash/find';
import _findIndex from 'lodash/findIndex';

const initialState = () => ({
    users: [],
    nextPage: 1,
    loggedUser: null,
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
   
}

const actions = {
    reset({ commit }) {
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
            await patchUser(payload.user);
            commit('PATCH_USER', payload);
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


    async getUser({state}, id) {
        try {
            let user = _.find(state.users, ['id', id]);
            if(user) {
                return user;
            }
            return this.fetchUser(id);
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

    sortUsersList({commit}, sortBy) {
       commit('SORT_USERS', sortBy);
    }
    
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

    SET_USERS(state, users) {
        state.users = users;
    },

    ADD_USERS(state, users) {
        state.users.push(...users);
    },

    SET_FILTERED_USERS(state, users) {
        state.users.slice(0, state.users.length);
        state.users = users;
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
            state.users.slice(selectedUserIndex, 1);
        }
    },

    SAVE_NEXT_PAGE(state, page) {
        state.nextPage = page;
    },

    SORT_USERS(state, orderBy) {
        switch(orderBy) {
            case 1:
                state.users = _orderBy(state.users, [user => user.name.toLowerCase()], ['asc']);
                break;
            case 2:
                state.users = _orderBy(state.users, [user => user.name.toLowerCase()], ['desc']);
                break;
            case 3:
                state.users = _orderBy(state.users, [user => user.first_name.toLowerCase()], ['asc']);
                break;
            case 4:
                state.users = _orderBy(state.users, [user => user.first_name.toLowerCase()], ['desc']);
                break;
            case 5:
                state.users = _orderBy(state.users, [user => user.email.toLowerCase()], ['asc']);
                break;
            case 6: 
                state.users = _orderBy(state.users, [user => user.email.toLowerCase()], ['desc']);
                break;
            case 7: 
                state.users = _orderBy(state.users, ['role_id'], ['desc']);
                break;
            case 8:
                state.users = _orderBy(state.users, ['role_id'], ['asc']);
                break;
            case 9: 
                state.users = _orderBy(state.users, ['orders'], ['desc']);
                break;
            case 10:
                state.users = _orderBy(state.users, ['orders'], ['asc']);
                break;
            case 11: 
                state.users = _orderBy(state.users, ['reservations'], ['desc']);
                break;
            case 12:
                state.users = _orderBy(state.users, ['reservations'], ['asc']);
                break;
            case 13:
                state.users = _orderBy(state.users, ['created_at'], ['asc']);
                break;
            case 14:
                state.users = _orderBy(state.users, ['created_at'], ['desc']);
                break;
        }
    }

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}