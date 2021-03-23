import { downloadUnits, patchUnit } from '../../api/unit.api';

const initialState = () => ({
    units: [],
});

const state = initialState();

const getters = {
    getUnits: (state) => state.units
}

const actions = {
    reset({ commit }) {
        commit('RESET');
    },
    
    async fetchUnits({commit}) {
        try {
            const response = await downloadUnits();
            commit('SET_UNITS', response.data);
        } catch ( error ) {
            throw error
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

    SET_UNITS(state, payload) {
        state.units = payload;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}