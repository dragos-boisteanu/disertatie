import { downloadOrders, storeOrder } from '../../api/orders.api'
import { downloadStatuses } from '../../api/orderStatuses.api'

const initialState = () => ({
    orders: [],
    statuses: [],
})

const state = initialState();

const getters = {
    getOrders(state) {
        return state.orders
    },

    getOrderStatuses(state) {
        return state.statuses;
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

    async downloadOrderStatues({commit}) {
        try {
            const response = await downloadStatuses();
            commit('SET_ORDER_STATUSES', response.data)
        } catch ( error ) {
            throw error
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
    },

    SET_ORDER_STATUSES(state, payload) {
        state.statuses = payload;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}