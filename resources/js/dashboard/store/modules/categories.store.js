import { searchCategories, downloadCategories, postCategory, patchCategory, updatePosition, updateSubCategoryPosition, disableCategory, restoreCategory, deleteCategory } from '../../api/categories.api';
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
            payload.subCategories = [];

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
        const response = await disableCategory(payload.category.id);
        payload.category.deletedAt = response.data.deletedAt;
        commit('SET_CATEGORY_DELETED_AT', payload);
        return { deletedAt: response.data.deletedAt, message: response.data.message };
    },

    async restoreCategory({ commit }, payload) {
        const response = await restoreCategory(payload.category.id);
        payload.category.deletedAt = null
        commit('SET_CATEGORY_DELETED_AT', payload);
        return response.data.message;
    },

    async deleteCategory({ commit }, payload) {
        try {
            const response = await deleteCategory(payload.id);
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
    },

    async updatePosition({ commit }, payload) {
        try {
            const response = await updatePosition(payload);

            commit('UPDATE_POSITION', payload);

            return response.data.message;
        } catch (error) {
            throw error;
        }
    },

    // payload = {
    //     id: 23,
    //     direction: 1/0, 1 -up, 0 - down
    //     vm: this
    // }
    async updateSubCategoryPosition({ commit }, payload) {
        try {
            const data = {
                id: payload.id,
                direction: payload.direction
            }
            // const response = await updateSubCategoryPosition(data);

            commit('UPDATE_SUB_CATEGORY_POSITION', payload);
            // return response.data.message;
        } catch (error) {
            throw error;
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

    SET_CATEGORIES(state, payload) {
        state.categories = payload;
    },

    ADD_CATEGORY(state, payload) {
        if (payload.parentId !== null && payload.parentId !== undefined) {
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
            if (payload.category.originalParentId !== null && payload.category.originalParentId !== undefined) {
                const originalParentCategoryIndex = _findIndex(state.categories, ['id', parseInt(payload.category.originalParentId)]);
                const subCategoryIndex = _findIndex(state.categories[originalParentCategoryIndex].subCategories, ['id', parseInt(payload.category.id)]);

                Object.keys(payload.category).forEach(key => {
                    vm.$set(state.categories[originalParentCategoryIndex].subCategories[subCategoryIndex], key, payload.category[key]);
                });

                if (payload.category.removeDiscount !== null && payload.category.removeDiscount !== undefined && payload.category.removeDiscount) {
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
                const newParentCategoryIndex = _findIndex(state.categories, ['id', parseInt(payload.category.parentId)]);
                const category = _find(state.categories, ['id', payload.category.id]);
                const categoryIndex = _findIndex(state.categories, ['id', parseInt(category.id)]);

                category.parentId = payload.category.parentId;

                state.categories.splice(categoryIndex, 1);

                state.categories[newParentCategoryIndex].subCategories.push(category);
            }
        } else {
            const categoryIndex = _findIndex(state.categories, ['id', payload.category.id]);

            Object.keys(payload.category).forEach(key => {
                vm.$set(state.categories[categoryIndex], key, payload.category[key]);
            });

            if (payload.category.removeDiscount !== null && payload.category.removeDiscount !== undefined && payload.category.removeDiscount) {
                vm.$set(state.categories[categoryIndex], 'discountId', null);
            }

        }


    },

    DELETE_CATEGORY(state, payload) {
        if (payload.parentId) {
            const parentCategoryIndex = _findIndex(state.categories, ['id', parseInt(payload.parentId)]);
            const categoryIndex = _findIndex(state.categories[parentCategoryIndex].subCategories, ['id', parseInt(payload.id)]);
            state.categories[parentCategoryIndex].subCategories.splice(categoryIndex, 1);
        } else {
            const categoryIndex = _findIndex(state.categories, ['id', payload]);
            state.categories.splice(categoryIndex, 1);
        }
    },

    SET_CATEGORY_DELETED_AT(state, payload) {
        const vm = payload.vm;

        if (payload.category.parentId) {
            const parentCategoryIndex = _findIndex(state.categories, ['id', parseInt(payload.category.parentId)]);
            const categoryIndex = _findIndex(state.categories[parentCategoryIndex].subCategories, ['id', parseInt(payload.category.id)]);

            console.log(payload.category.deletedA);

            vm.$set(state.categories[parentCategoryIndex].subCategories[categoryIndex], 'deletedAt', payload.category.deletedAt);
        } else {
            const categoryIndex = _findIndex(state.categories, ['id', payload.category.id]);
            vm.$set(state.categories[categoryIndex], 'deletedAt', payload.category.deletedAt);
        }

    },

    SET_FOUND_CATEGORIES(state, foundCategories) {
        state.categories = foundCategories
    },

    UPDATE_POSITION(state, payload) {
        const categoryIndex = state.categories.findIndex(category => category.id == payload.categoryId);
        const targetCategoryIndex = state.categories.findIndex(targetCategoryIndex => targetCategoryIndex.id == payload.targetCategoryId);

        const deleted = state.categories.splice(categoryIndex, 1);
        state.categories.splice(targetCategoryIndex, 0, deleted[0]);

        state.categories.forEach((category, index) => {
            category.position = index + 1;
        })
    },

    UPDATE_SUB_CATEGORY_POSITION(state, payload) {

        try {


            const vm = payload.vm;

            const parentCategoryIndex = state.categories.findIndex(parentCategory => parentCategory.id == payload.parentId);

            const categoryIndex = state.categories[parentCategoryIndex].subCategories.findIndex(category => category.id == payload.id);

            let adjenctCategoryIndex = -1;
            let categoryNewPosition = -1;
            let adjenctCategoryNewPosition = -1;




            if (payload.direction == 1) {
                console.log(payload);
                adjenctCategoryIndex = categoryIndex - 1;

                categoryNewPosition = state.categories[parentCategoryIndex].subCategories[categoryIndex].position - 1;
                adjenctCategoryNewPosition = state.categories[parentCategoryIndex].subCategories[adjenctCategoryIndex].position + 1;

                const deleted = state.categories[parentCategoryIndex].subCategories.splice(adjenctCategoryIndex, 1);
                state.categories[parentCategoryIndex].subCategories.splice(categoryIndex, 0, deleted[0]);

            } else {
                adjenctCategoryIndex = categoryIndex + 1;

                categoryNewPosition = state.categories[parentCategoryIndex].subCategories[categoryIndex].position + 1;
                adjenctCategoryNewPosition = state.categories[parentCategoryIndex].subCategories[adjenctCategoryIndex].position - 1;

                const deleted = state.categories[parentCategoryIndex].subCategories.splice(categoryIndex, 1);
                state.categories[parentCategoryIndex].subCategories.splice(adjenctCategoryIndex, 0, deleted[0]);

            }

        } catch (error) {
            console.log(error);

        }

    }

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}