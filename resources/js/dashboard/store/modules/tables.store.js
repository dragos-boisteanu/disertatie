import {
  downloadTables, 
  storeTable,
  patchTable,
  disableTable,
  restoreTable,
  deleteTable
} from '../../api/tables.api';

import _findIndex from 'lodash/findIndex';

const initialState = () => ({
  tables: []
});

const state = initialState();


const getters = {
  getTables(state) {
    return state.tables
  }
}

const actions = {
  async downloadTables({ commit }) {
    const response = await downloadTables();

    commit('SET_TABLES', response.data.data);
  },

  async storeTable({commit}, tableName) {
    const response = await storeTable(tableName);
    const table = response.data;
    commit('ADD_TABLE', table)
    return table;
  },

  async disableTable({commit}, payload) {
    const response = await disableTable(payload.id);
    payload.status = response.data.status;
    commit('DISABLE_TABLE', payload);
    return payload.status;
  },

  async restoreTable({commit}, payload) {
    const response = await restoreTable(payload.id);
    payload.status = response.data.status;
    commit('RESTORE_TABLE', payload);
    return payload.status;
  },

  async deleteTable({commit}, tableId) {
    await deleteTable(tableId);
    commit('DELETE_TABLE');
  }
}

const mutations = {
  SET_TABLES(state, tables) {
    state.tables = tables;
  },

  ADD_TABLE(state, table) {
    state.tables.push(table);
  },

  DISABLE_TABLE(state, payload) {
    const vm = payload.vm;
    const tableIndex = _findIndex(state.tables, ['id', payload.id]);
    Object.keys(payload.status).forEach(key => {
      vm.$set(state.tables[tableIndex].status, key, payload.status[key]);
    })
  },

  RESTORE_TABLE(state, payload) {
    const vm = payload.vm;
    const tableIndex = _findIndex(state.tables, ['id', payload.id]);
    Object.keys(payload.status).forEach(key => {
      vm.$set(state.tables[tableIndex].status, key, payload.status[key]);
    })
  },

  DELETE_TABLE(state, tableId) {
    const tableIndex = _findIndex(state.tables, ['id', tableId]);
    state.tables.splice(tableIndex,1);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}