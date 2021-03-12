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
            console.log('here');
            const response = await downloadUsers(page);
            console.log(response)
            commit('SET_USERS', response.data.data);
        } catch (error) {
            throw error; 
        }
    }
}

const mutations = {
    SET_USERS(state, users) {
        state.users.push(...users);
    },

    ADD_USER(state, user) {
        state.users.unshift(user);
    },
    
    REMOVE_USER(state, index) {
        state.users.splice(index, 1);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}