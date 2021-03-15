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
