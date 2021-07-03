import { searchCategories, downloadCategories, postCategory, patchCategory, disableCategory, restoreCategory, deleteCategory } from '../../api/categories.api';
import _findIndex from 'lodash/findIndex';
import _filter from 'lodash/filter';
import _isEqual from 'lodash/isEqual'
import _find from 'lodash/find'

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
            return { category, message: response.data.message }
        } catch (error) {
            throw error;
        }
    },

    async disableCategory({ commit }, payload) {
        const response = await disableCategory(payload.id);
        payload.deletedAt = response.data.deletedA;
        commit('SET_CATEGORY_DELETED_AT', payload);
        return { deletedAt: response.data.deletedAt, message: response.data.message };
    },

    async restoreCategory({ commit }, payload) {
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

    async searchCategories({ commit }, value) {
        try {
            const response = await searchCategories(value);

            commit('SET_CATEGORIES', response.data.data);

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
        if (payload.parentId !== null || payload !== undefined) {
            const parentCategoryIndex = _findIndex(state.categories, ['id', parseInt(payload.parentId)]);
            console.log(parentCategoryIndex)
            state.categories[parentCategoryIndex].subCategories.push(payload);
        } else {
            state.categories.push(payload);
        }

    },

    PATCH_CATEGORY(state, payload) {
        const vm = payload.vm;

        if (payload.category.parentId !== null && payload.category.parentId !== undefined) {
            const originalParentCategoryIndex = _findIndex(state.categories, ['id', parseInt(payload.category.originalParentId)]);
          
            const subCategoryIndex = _findIndex(state.categories[originalParentCategoryIndex].subCategories, ['id', parseInt(payload.category.id)]);

            Object.keys(payload.category).forEach(key => {
                vm.$set(state.categories[originalParentCategoryIndex].subCategories[subCategoryIndex], key, payload.category[key]);
            });

            if (payload.category.discountId === null || payload.category.discountId === undefined) {
                vm.$set(state.categories[originalParentCategoryIndex].subCategories[subCategoryIndex], 'discountId', null);
            }

            // if the subCategory has a new parent
            // remove the subCategory from the actula parent
            // add the subCategory to the new parent
            if (payload.category.originalParentId && !_isEqual(payload.category.originalParentId, payload.parentId)) {
                const subCategory = _find(state.categories[originalParentCategoryIndex].subCategories, ['id', payload.category.id]);
                const newParentCategoryIndex = _findIndex(state.categories, ['id', parseInt(payload.category.parentId)]);

                delete subCategory.originalParentId;

                state.categories[originalParentCategoryIndex].subCategories.splice(subCategoryIndex, 1);

  
                state.categories[newParentCategoryIndex].subCategories.push(subCategory);

            }            

        } else {
            const categoryIndex = _findIndex(state.categories, ['id', payload.category.id]);

            Object.keys(payload.category).forEach(key => {
                vm.$set(state.categories[categoryIndex], key, payload.category[key]);
            });

            if (payload.category.discountId === null || payload.category.discountId === undefined) {
                vm.$set(state.categories[categoryIndex], 'discountId', null);
            }
        }

    },

    DELETE_CATEGORY(state, payload) {
        const categoryIndex = _findIndex(state.categories, ['id', payload]);
        state.categories.splice(categoryIndex, 1);
    },

    // UPDATE_DISCOUNT(state, payload) {
    //     const vm = payload.vm;

    //     if(payload.category.parentId !== null && payload.category.parentId !== undefined) {
    //         const parentCategoryIndex = _findIndex(state.categories, ['id', parseInt(payload.category.parentId)]);
    //         const categoryIndex = _findIndex(state.categories, ['id', parseInt(payload.category.id)]);

    //         vm.$set(state.categories[parentCategoryIndex].subCategories[categoryIndex], 'discountId', payload.category.discountId);
    //     } else {
    //         const categoryIndex = _findIndex(state.categories, ['id', payload.category.id]);

    //         vm.$set(state.categories[categoryIndex], 'discountId', payload.category.discountId);
    //     }

    // },

    SET_CATEGORY_DELETED_AT(state, payload) {
        const vm = payload.vm;
        const categoryIndex = _findIndex(state.categories, ['id', payload.id]);

        vm.$set(state.categories[categoryIndex], 'deletedAt', payload.deletedAt);
    },

    SET_FOUND_CATEGORIES(state, foundCategories) {
        state.categories = foundCategories
    }

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}