import { downloadTables } from '../../api/tables.api';


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
  async downloadTables({commit}) {
    const response = await downloadTables();

    commit('SET_TABLES', response.data.data);
  }
}

const mutations = {
  SET_TABLES(state, tables) {
    state.tables = tables;
  }
}

export default { 
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}