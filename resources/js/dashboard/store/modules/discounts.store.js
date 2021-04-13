import {downloadDiscounts, postDiscount, patchDiscount, deleteDiscount, disableDiscount, restoreDiscount } from '../../api/discounts.api';


const initialState = () => ({
    discounts: null,
})

const state = initialState();

const getters = {

    getDiscounts(state) {
        return state.discounts;
    }
}

const actions = {
    reset({ commit }) {
        commit('RESET');
    },

    async downloadDiscounts({commit}) {
        try {
            const response = await downloadDiscounts();
            commit('SET_DISCOUNTS', response.data.data)
        } catch (error) {
            throw error;
        }
    }
}

const muttations = {
    RESET(state) {
        const newState = initialState();
        Object.keys(newState).forEach(key => {
            state[key] = newState[key]
        })
    },

    SET_DISCOUNTS(state, payload) {
        state.discounts = payload;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    muttations
}