import { getNewOrdersCount } from '../../api/orders.api';

const initialState = () => ({
	newOrdersCount: 0
});

const state = initialState();


const getters = {
	getNewOrdersCount(state) {
		return state.newOrdersCount;
	}
}

const actions = {
	async fetchNewOrdersCount({ commit }) {
		try {
			const response = await getNewOrdersCount();
			commit('SET_NEW_ORDERS_COUNT', response.data.newOrdersCount);
		} catch (error) {
			throw error;
		}
	},

	incrementNewOrdersCount({ commit }) {
		commit('INCREMENT_NEW_ORDER_COUNT');
	},

	decrementNewOrderCount({ commit }) {
		commit('DECREMENT_NEW_ORDER_COUNT');
	},

}

const mutations = {
	INCREMENT_NEW_ORDER_COUNT(state) {
		state.newOrdersCount++;
	},

	DECREMENT_NEW_ORDERS_COUNT(state) {
		state.newOrdersCount--;
	},

	SET_NEW_ORDERS_COUNT(state, ordersCount) {
		state.newOrdersCount = ordersCount;
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}