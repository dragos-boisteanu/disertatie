const initialState = () => ({
	newOrderNotifcationState: !!localStorage.getItem('newOrdersNotifcationState') || false,
	newReservationNotificationState: false,
	newUserNotificationState: false,
})

const state = initialState();

const getters = {
	getNewOrderNotificationState(state) {
		console.log(state.newOrderNotifcationState);
		return state.newOrderNotifcationState;
	},

	getNewReservationNotificationState(state) {
		return state.newReservationNotificationState;
	},

	getNewUsersNotificationState(state) {
		return state.newUserNotificationState;
	}
}

const actions = {
	setNewOrderNotificationState({ commit }, payload) {
		commit('SET_NEW_ORDER_NOTIFICATIONS_STATE', payload);
	},

	setNewReservationNotificationState({ commit }, payload) {
		commit('SET_NEW_ORDERS_NOTIFICATIONS_STATE', payload);
	},

	setNewUsersNotificationState({ commit }, payload) {
		commit('SET_NEW_ORDERS_NOTIFICATIONS_STATE', payload);
	}
}

const mutations = {
	SET_NEW_ORDER_NOTIFICATIONS_STATE(state, payload) {
		state.newOrderNotifcationState = payload;
		localStorage.setItem('newOrderNotifcationState', payload);
	},

	SET_NEW_RESERVATION_NOTIFICATION_STATE(state, payload) {
		state.newReservationNotificationState = payload;
	},

	SET_NEW_USER_NOTIFICATIONS_STATE(state, payload) {
		state.newUserNotificationState = payload;
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}