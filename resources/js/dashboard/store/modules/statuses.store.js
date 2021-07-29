import { downloadOrdersStatuses } from '../../api/statuses';
import { downloadReservationsStatuses } from '../../api/statuses';

const initialState = () => ({
	ordersStatuses: [],
	reservationStatuses: [],
});

const state = initialState();

const getters = {
	getOrdersStatuses(state) {
		return state.ordersStatuses;
	},

	getReservationStatuses(state) {
		return state.reservationStatuses
	}
}

const actions = {
	async downloadOrdersStatuses({ commit }) {
		const response = await downloadOrdersStatuses();
		commit('SET_ORDERS_STATUSES', response.data);
	},

	async downloadReservationsStatuses({ commit }) {
		const response = await downloadReservationsStatuses();

		commit('SET_RESERVATIONS_STATUSES', response.data);
	}
}

const mutations = {
	SET_ORDERS_STATUSES(state, payload) {
		state.ordersStatuses = payload;
	},

	SET_RESERVATIONS_STATUSES(state, payload) {
		state.reservationStatuses = payload
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
}