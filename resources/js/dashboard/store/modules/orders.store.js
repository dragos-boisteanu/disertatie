import { downloadOrders, storeOrder, downloadOrder } from '../../api/orders.api'
import { downloadStatuses } from '../../api/orderStatuses.api'
import _find from 'lodash/find';

const initialState = () => ({
    orders: [],
    statuses: [],
    nextPage: 1,
    filtered: false,
})

const state = initialState();

const getters = {
    getOrders(state) {
        return state.orders
    },

    getOrderStatuses(state) {
        return state.statuses;
    },

    getOrdersNextPage(state) {
        return state.nextPage
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

    async downloadOrder({}, payload) {
        try {
            const response = await downloadOrder(payload);
            return response.data.data; 
        } catch(error) {
            throw error
        }
    },

    async refreshOrders({commit}) {
        try {
            const response = await downloadOrders(1);
            commit('REFRESH_ORDERS', response.data.data)
            
        } catch ( error ) {
            throw error;
        }
    },

    async getOrder({state, dispatch }, payload) {
        try {
            let order = _find(state.orders, ['id', parseInt(payload)]);

            if(order) {
                return order;
            }

            return dispatch('downloadOrder', payload);
            
        } catch ( error ) {
            throw error
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

    REFRESH_ORDERS(state, payload) {
        state.orders = payload;
        state.nextPage = 2;
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