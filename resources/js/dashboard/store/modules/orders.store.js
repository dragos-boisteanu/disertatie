import {storeOrder} from '../../api/orders.api'

const initialState = () => ({
    orders: null
})

const state = initialState();

const getters = {
    getOrders(state) {
        return state.orders
    }
}

const actions = {
    async storeOrder({comit}, payload) {
        try {
            await storeOrder(payload);
            comit('ADD_ORDER', payload)
        } catch ( error ) {
            throw error
        }
    }
}

const muttations = {
    ADD_ORDER(state, payload) {
        state.orders.unshift(payload)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    muttations
}