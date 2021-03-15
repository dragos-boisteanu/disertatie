import { downloadUsers, downloadUser, patchUser,  disableUser, deleteUser } from '../../api/users.api';

const initialState = () => ({
    users: [],
    nextPage: 1,
    filteredNextPage: 1,
});

const state = initialState();

const getters = {
    getUsers (state) {
        return state.users; 
    },

    getNextPage(state) {
        return state.nextPage;
    },

    getFilteredNextPage(state) {
        return state.filteredNextPage;
    }
}

const actions = {
    reset({ commit }) {
        commit('RESET');
    },

    async fetchUsers({commit}, query) {
        try {
            const response = await downloadUsers(query);
            const users = response.data.data.users;
            const links = response.data.links;
   
            commit('SET_USERS',users );

            if(links.next) {
                commit('SAVE_NEXT_PAGE', links.next.substr(links.next.length-1));
            }else {
                commit('SAVE_NEXT_PAGE', -1);
            }    
        } catch (error) {
            throw error; 
        }

    },

    async fetchFilteredUsers({commit}, query) {
        try {
            const response = await downloadUsers(query);
            const users = response.data.data.users;
            const links = response.data.links;

            commit('SET_FILTERED_USERS', users);

            if(links.next) {
                commit('SAVE_FILTERED_NEXT_PAGE', links.next.substr(links.next.length-1));
            }else {
                commit('SAVE_FILTERED_NEXT_PAGE', -1);
            }    

        } catch ( error ) {
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
    },
    
}

const mutations = {
    RESET(state) {
        const newState = initialState();
        Object.keys(newState).forEach(key => {
            state[key] = newState[key]
        })
    },

    SET_USERS(state, users) {
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
    
    REMOVE_USER(state, index) {
        state.users.splice(index, 1);
    },

    SAVE_NEXT_PAGE(state, page) {
        state.nextPage = page;
    },

    SAVE_FILTERED_NEXT_PAGE(state, page) {
        state.filteredNextPage = page;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}