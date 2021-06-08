import { downloadOrdersStatuses } from '../../api/statuses';
import { downloadTableStatuses } from '../../api/statuses';

const initialState = () => ({
  ordersStatuses: [],
  tablestatuses: [],
});

const state = initialState();

const getters = {
  getOrdersStatuses(state) {
    return state.ordersStatuses;
  },

  getTablestatuses(state) {
    return state.tableStatuses;
  }
}

const actions = {
  async downloadOrdersStatuses({commit}) {
    const response = await downloadOrdersStatuses();
    commit('SET_ORDERS_STATUSES', response.data);
  },

  async downloadTableStatuses({commit}) {
    const response = await downloadTableStatuses();
    commit('SET_TABLES_STATUSES', response.data)
  }
}

const mutations = {
  SET_ORDERS_STATUSES(state, payload) {
    state.ordersStatuses = payload;
  },

  SET_TABLES_STATUSES(state, payload) {
    state.tablestatuses = payload;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}