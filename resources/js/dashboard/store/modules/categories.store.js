import { searchCategory, downloadCategories, postCategory, patchCategory, disableCategory, restoreCategory, deleteCategory } from '../../api/categories.api';
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

    async fetchCategories({ commit }) {
        try {
            const response = await downloadCategories();
            commit('SET_CATEGORIES', response.data.data);
        } catch (error) {
            throw error;
        }
    },

    async postCategory({ commit }, payload) {
        try {
            const response = await postCategory(payload);
            payload.id = response.data.id;
            payload.color = response.data.color;
            if (payload.parentId) {
                payload.parentName = response.data.parentName
                payload.vat = response.data.vat
            } else {
                payload.parentName = null;
                payload.parentId = null;
            }

            payload.deletedAt = null;
            payload.productsCount = 0;

            commit('ADD_CATEGORY', payload);

            return response.data.message;
        } catch (error) {
            throw error
        }
    },

    async patchCategory({ commit }, payload) {
        try {
            const category = payload.category;
            const response = await patchCategory(category);
            if (response.data.parentName) {
                payload.category.parentName = response.data.parentName;
            }
            commit('PATCH_CATEGORY', payload);
            return {category, message: response.data.message}
        } catch (error) {
            throw error;
        }
    },

    async disableCategory({commit}, payload) {
        const response = await disableCategory(payload.id);
        payload.deletedAt = response.data.deletedA;
        commit('SET_CATEGORY_DELETED_AT', payload);
        return {deletedAt:  response.data.deletedAt, message: response.data.message};
    },

    async restoreCategory({commit}, payload)
    {
        const response = await restoreCategory(payload.id);
        payload.deletedAt = null
        commit('SET_CATEGORY_DELETED_AT', payload);
        return response.data.message;
    },

    async deleteCategory({ commit }, payload) {
        try {
            const response = await deleteCategory(payload);
            commit('DELETE_CATEGORY', payload);
            return response.data.message;
        } catch (error) {
            throw error
        }
    },

    async searchCategory({ commit }, categoryName) {
        // const regex = new RegExp(`${categoryName}+`, 'i')
        // return _filter(state.categories, (category) => regex.test(category.name))
        try {
            const response = await searchCategory(categoryName);
            if (response.status === 200) {
                commit('SET_CATEGORIES', response.data.categories);
            }
        } catch (error) {
            throw error;
        }
    },

    updateDiscount({ commit }, payload) {
        commit('UPDATE_DISCOUNT', payload);
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
        console.log(payload);
        state.categories.push(payload);
    },

    PATCH_CATEGORY(state, payload) {
        const categoryIndex = _findIndex(state.categories, ['id', payload.category.id]);
        const vm = payload.vm;

        console.log(payload.category)
        Object.keys(payload.category).forEach(key => {
            vm.$set(state.categories[categoryIndex], key, payload.category[key]);
        });
    },

    DELETE_CATEGORY(state, payload) {
        const categoryIndex = _findIndex(state.categories, ['id', payload]);
        state.categories.splice(categoryIndex, 1);
    },

    UPDATE_DISCOUNT(state, payload) {
        const vm = payload.vm;
        const categoryIndex = _findIndex(state.categories, ['id', payload.category.id]);

        vm.$set(state.categories[categoryIndex], 'discountId', payload.category.discountId);
    },

    SET_CATEGORY_DELETED_AT(state, payload) {
        const vm = payload.vm;
        const categoryIndex = _findIndex(state.categories, ['id', payload.id]);

        vm.$set(state.categories[categoryIndex], 'deletedAt', payload.deletedAt);
    }

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}