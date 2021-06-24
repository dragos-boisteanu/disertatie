const initialState = () => ({
  showBackdrop: false,
});

const getters = {
  getBackdropState: (state) => state.showBackdrop
}

const actions = {
  toggleBackdrop({commit}) {
    commit('TOGGLE')
  }
}

const mutations = {
  TOGGLE(state) {
    state.showBackdrop = !state.showBackdrop;
  }
}