import { downloadOrders, storeOrder, downloadOrder, disableOrder, patchOrder, removeItem, addItem } from '../../api/orders.api'
import { downloadStatuses } from '../../api/orderStatuses.api'
import _find from 'lodash/find';
import _findIndex from 'lodash/findIndex';

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
    },

    async patchOrder({state, commit}, payload ) {
        const response = await patchOrder(payload.localData);
        payload.localData.updatedAt = response.data;

        if(state.orders.length > 0) {
            commit('PATCH_ORDER', payload);
        }

        return payload.localData;        
    },

    
    async removeItemFromOrder({state,commit}, payload) {
        const response = await removeItem(payload.localData);
        payload.localData.updatedAt = response.data;
        
        if(state.orders.length > 0) {
            commit('REMOVE_ITEM', payload);
        }

        return payload.localData
    },

    async addItemToOrder({state,commit}, payload) {
        const response = await addItem(payload);

        payload.item = response.data.item
        payload.updatedAt = response.data.updatedAt;
        payload.totalQuantity = response.data.totalQuantity;
        payload.totalValue = response.data.totalValue;

        if(state.orders.length > 0) {
            commit('ADD_ITEM', payload)
        }

        return payload;

    },
    

    async disableOrder({commit}, payload) {
        const response = await disableOrder(payload.id);
        // payload.deletedAt = response.data;
        // commit('DISABLE_ORDER', payload);
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
    },

    PATCH_ORDER(state, payload) {
        const orderIndex = _findIndex(state.orders, ['id', payload.localData.id]);

        Object.keys(payload.localData).forEach(key => {
            payload.vm.$set(state.orders[orderIndex], key, payload.localData[key]);
        });

        // payload.vm.$set(state.orders[orderIndex], 'updatedAt', payload.updatedAt);
    },

    REMOVE_ITEM(state, payload) {
        const orderIndex =_findIndex(state.orders, ['id', payload.localData.id]);

        const itemIndex = _findIndex(state.orders[orderIndex].items, ['id', payload.localData.itemId]);

        state.orders[orderIndex].items.splice(itemIndex, 1);

        state.orders[orderIndex].updatedAt = payload.localData.updatedAt;
        
    },

    DISABLE_ORDER(state, payload) {
        const orderIndex = _findIndex(state.orders, ['id', payload.orderId]);
        payload.vm.$set(state.orders[orderIndex], 'deleted_at', payload.deletedAt);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}