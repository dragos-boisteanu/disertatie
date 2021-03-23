import { downloadCategories, downloadCategory, postCategory, patchCategory, deleteCategory } from '../../api/categories.api';

const initialState = () => ({
    categories: []
});

const state = initialState();

const getters = {
    getCategories: (state) => state.categories 
}

const actions = {
    reset({ commit }) {
        commit('RESET');
    },

    async fetchCategories({commit}) {
        try {
            const response = await downloadCategories();
            commit('SET_CATEGORIES', response.data);
        } catch ( error ) {
            throw error;
        }
    }
}

const mutations = {
    RESET(state) {
        const newState = initialState();
        Object.keys(newState).forEach(key => {
            state[key] = newState[key]
        })
    },

    SET_CATEGORIES(state, payload) {
        state.categories = payload;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}