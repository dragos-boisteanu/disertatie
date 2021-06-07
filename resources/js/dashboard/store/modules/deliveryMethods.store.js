import { fetchDeliveryMethods } from '../../api/deliveryMethods.api';

const initialState = () => ({
    deliveryMethods: null
});


const state = initialState();

const getters = {
    getDeliveryMethods(state) {
        return state.deliveryMethods;
    }
}

const actions = {

    reset({ commit }) {
        commit('RESET');
    },

    async fetchDeliveryMethods({commit}) {
        try {
            const response = await fetchDeliveryMethods();
            commit('SET_DELIVERY_METHODS', response.data);
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

    SET_DELIVERY_METHODS(state, payload) {
        state.deliveryMethods = payload;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

