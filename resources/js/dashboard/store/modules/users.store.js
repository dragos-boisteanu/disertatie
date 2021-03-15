import { downloadUsers, downloadUser, patchUser,  disableUser, deleteUser } from '../../api/users.api';

const initialState = () => ({
    users: [],
    nextPage: 1
});

const state = initialState();

const getters = {
    getUsers (state) {
        return state.users; 
    },
}

const actions = {
    async fetchUsers({commit}, page) {
        try {
            const response = await downloadUsers(page);
            const users = response.data.data.users;
            const links = response.data.links;
            commit('SET_USERS',users );
            
            if(links.next) {
                commit('SAVE_NEXT_PAGE', links.next.substr(links.next.length-1));
            }
        } catch (error) {
            throw error; 
        }
    },

    async refreshUsers({commit}) {
        try {
            const response = await downloadUsers(1);
            commit('REFRESH_USERS', response.data.data.users);
        } catch (error) {
            throw error; 
        }
    }
}

const mutations = {
    SET_USERS(state, users) {
        state.users.push(...users);
    },

    REFRESH_USERS(state, users) {
        state.users = users;
    },

    ADD_USER(state, user) {
        state.users.unshift(user);
    },
    
    REMOVE_USER(state, index) {
        state.users.splice(index, 1);
    },

    SAVE_NEXT_PAGE(state, page) {
        state.nextPage = page;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}