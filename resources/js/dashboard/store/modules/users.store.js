import { downloadLoggedUserData } from '../../api/users.api';
import _orderBy from 'lodash/orderBy';
import _find from 'lodash/find';
import _findIndex from 'lodash/findIndex';

const initialState = () => ({
	loggedUser: null,
	subscribedToNewOrders: false,
});

const state = initialState();

const getters = {
	getLoggedUser(state) {
		return state.loggedUser;
	},

	getSubscribedToNewOrders(state) {
		return state.subscribedToNewOrders;
	},

	isAdmin(state) {
		return state.loggedUser.isAdmin;
	},

	isLocationManager(state) {
		return state.loggedUser.isLocationManager;
	},

	isKitchenManager(state) {
		return state.loggedUser.isKitchenManager;
	},

	isWaiter(state) {
		return state.loggedUser.isWaiter;
	},

	isKitchen(state) {
		return state.loggedUser.isKitchen;
	},

	isDelivery(state) {
		return state.loggedUser.isDelivery;
	},



}

const actions = {
	resetUser({ commit }) {
		commit('RESET');
	},

	async downloadLoggedUserData({ commit }) {
		try {
			const response = await downloadLoggedUserData();
			commit('SET_LOGGED_USER', response.data.data);
		} catch (error) {
			throw error
		}
	},

	toggleSubscribedToNewOrders({ commit }) {
		commit('TOGGLE_SUBSCRIBED_TO_NEW_ORDERS');
	}

}

const mutations = {
	RESET(state) {
		const newState = initialState();
		Object.keys(newState).forEach(key => {
			state[key] = newState[key]
		})
	},

	SET_LOGGED_USER(state, payload) {
		state.loggedUser = payload;
	},

	TOGGLE_SUBSCRIBED_TO_NEW_ORDERS(state) {
		state.subscribedToNewOrders = !state.subscribedToNewOrders;
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
}