import {downloadLoggedUserData} from '../../api/users.api';
import _orderBy from 'lodash/orderBy';
import _find from 'lodash/find';
import _findIndex from 'lodash/findIndex';

const initialState = () => ({
    loggedUser: null,
});

const state = initialState();

const getters = {
    getLoggedUser(state) {
        return state.loggedUser;
    },

    isAdmin(state) {
        return state.loggedUser.role.name === "Administrator";
    },

    isLocationManager(state) {
        return state.loggedUser.role.name === "Location Manager";
    },

    isWaiter(state) {
        return state.loggedUser.role.name === "Waiter";
    },

    isKitchenManager(state) {
        return state.loggedUser.role.name === "Kitchen Manager";
    },

    isDelivery(state) {
        return state.loggedUser.role.name === "Delivery";
    },

    isKitchen(state) {
        return state.loggedUser.role.name === "Kitchen";
    },
   
}

const actions = {
    resetUser({ commit }) {
        commit('RESET');
    },

    async downloadLoggedUserData({commit}) {
        try {
            const response = await downloadLoggedUserData();
            commit('SET_LOGGED_USER', response.data.data);
        } catch (error) {
            throw error
        } 
    },  

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
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}