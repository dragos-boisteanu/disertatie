import {downloadOrders,storeOrder} from '../../api/orders.api'

const initialState = () => ({
    orders: []
})

const state = initialState();

const getters = {
    getOrders(state) {
        return state.orders
    }
}

const actions = {
    resetOrders({commit}) {
        commit('RESET');
    },

    async downloadOrders({commit}, payload) {
        try {
            const response = await downloadOrders(payload);
            commit('SET_ORDERS', response.data.data);
        } catch ( error ) {

        }
    },

    async storeOrder({commit}, payload) {
        try {
            await storeOrder(payload);
            commit('ADD_ORDER', payload)
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

    SET_ORDERS(state, payload) {
        state.orders = payload;
    },  
    
    ADD_ORDER(state, payload) {
        state.orders.unshift(payload)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}