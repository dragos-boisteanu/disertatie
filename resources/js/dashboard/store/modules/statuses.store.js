import { downloadOrdersStatuses } from '../../api/statuses';
import { downloadTableStatuses } from '../../api/statuses';

const initialState = () => ({
  ordersStatuses: [],
});

const state = initialState();

const getters = {
  getOrdersStatuses(state) {
    return state.ordersStatuses;
  },

}

const actions = {
  async downloadOrdersStatuses({commit}) {
    const response = await downloadOrdersStatuses();
    commit('SET_ORDERS_STATUSES', response.data);
  },
}

const mutations = {
  SET_ORDERS_STATUSES(state, payload) {
    state.ordersStatuses = payload;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}