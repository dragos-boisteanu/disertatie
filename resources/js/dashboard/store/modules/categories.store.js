import { searchCategory, downloadCategories, postCategory, patchCategory, deleteCategory } from '../../api/categories.api';
import _findIndex from 'lodash/findIndex';
import _filter from 'lodash/filter';

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
            console.log(response.data);
        } catch ( error ) {
            throw error;
        }
    },

    async postCategory({commit}, payload) {
        try {
            const response = await postCategory(payload);
            payload.id = response.data.id;
            commit('ADD_CATEGORY', payload);
        } catch ( error ) {
            throw error
        }
    },

    async patchCategory({commit}, payload) {
        try {
            const category = payload.category;
            await patchCategory(category);
            commit('PATCH_CATEGORY', payload);
            return category
        } catch ( error){
            throw error;
        }
    },

    async deleteCategory({commit}, payload) {
        try {
            await deleteCategory(payload);
            commit('DELETE_CATEGORY', payload);
        } catch ( error ) {
            throw error
        }
    },

    async searchCategory({commit}, categoryName) {
        // const regex = new RegExp(`${categoryName}+`, 'i')
        // return _filter(state.categories, (category) => regex.test(category.name))
        try {
            const response = await searchCategory(categoryName);
            if(response.status === 200) {
                commit('SET_CATEGORIES', response.data.categories);
            }
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
    },

    ADD_CATEGORY(state, payload) {
        state.categories.push(payload);
    },

    PATCH_CATEGORY(state, payload) {
        const categoryIndex = _findIndex(state.categories, ['id', payload.category.id]);
        const vm = payload.vm;

        Object.keys(payload.category).forEach(key => {
            vm.$set(state.categories[categoryIndex], key, payload.category[key]);
        });
    },

    DELETE_CATEGORY(state, payload) {
        const categoryIndex = _findIndex(state.categories, ['id', payload]);
        state.categories.splice(categoryIndex, 1);
    }

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}