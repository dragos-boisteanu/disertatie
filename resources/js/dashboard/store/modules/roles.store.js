import { downloadRoles } from '../../api/roles.api';

const initialState = () => ({
    roles: []
});

const state = initialState();

const getters = {
    getRoles(state) {
        return state.roles;
    },
}

const actions = {
    reset({ commit }) {
        commit('RESET');
    },

    async fetchRoles({commit}) {
        try {
            const response = await downloadRoles();
            commit('SET_ROLES', response.data.data.roles);
        } catch ( error ) {
            throw error;
        }
    }
}

const mutations = {
    RESET(state) {
        const newState = initialState();
        Object.keys(newState).forEach(key => {
            state[key] = newState[key]
        })
    },
    
    SET_ROLES(state, roles) {
        state.roles = roles
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
