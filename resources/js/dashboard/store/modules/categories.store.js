import { searchCategories, downloadCategories, postCategory, removeParent, patchCategory, updatePosition, updateSubCategoryPosition, addDiscount, removeDiscount, disableCategory, restoreCategory, deleteCategory } from '../../api/categories.api';

import _findIndex from 'lodash/findIndex';
import _filter from 'lodash/filter';
import _isEqual from 'lodash/isEqual'



const initialState = () => ({
	categories: [],
	selectedCategory: null,
	selectedCategoryParentId: null,
});

const state = initialState();

const getters = {
	getCategories: (state) => state.categories,
	getSelectedCategory: (state) => state.selectedCategory,
	getSelectedCategoryParentId: (state) => state.selectedCategoryParentId,
}

const actions = {
	reset({ commit }) {
		commit('RESET');
	},

	setSelectedCategory({ commit }, payload) {
		commit('SET_SELECTED_CATEGORY', payload);
	},

	setSelectedCategoryParentId({ commit }, payload) {
		commit('SET_SELECTED_CATEGORY_PARENT_ID', payload);
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
			payload.position = response.data.position;

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

			if (response.data.position) {
				payload.category.position = response.data.position;
			}

			console.log(payload);
			commit('PATCH_CATEGORY', payload);
			return { category, message: response.data.message, position: response.data.position }
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
	// }
	async updateSubCategoryPosition({ commit }, payload) {
		try {
			const data = {
				id: payload.id,
				direction: payload.direction
			}
			const response = await updateSubCategoryPosition(data);

			payload.position = response.data.position;

			commit('UPDATE_SUB_CATEGORY_POSITION', payload);

			return response;
		} catch (error) {
			throw error;
		}
	},

	async addDiscount({ commit }, payload) {
		try {
			const data = {
				id: payload.id,
				discountId: payload.discountId
			}
			const response = await addDiscount(data);

			commit('ADD_DISCOUNT', payload);

			return response;

		} catch (error) {
			throw error;
		}
	},

	async removeDiscount({ commit }, payload) {
		try {
			const reponse = await removeDiscount(payload.id);
			commit('REMOVE_DISCOUNT', payload);

			return reponse;

		} catch (error) {
			throw error;
		}
	},

	async removeParent({ commit }, payload) {
		try {
			const response = await removeParent(payload.id);

			payload.position = response.data.position;
			commit('REMOVE_PARENT', payload);

			return response;
		} catch (error) {
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

	SET_SELECTED_CATEGORY(state, category) {

		if (
			_isEqual(category, state.selectedCategory) &&
			(category.parentId === null || category.parentId === undefined)
		) {
			state.selectedCategory = null;
		} else {
			state.selectedCategory = category;
		}
	},

	SET_SELECTED_CATEGORY_PARENT_ID(state, payload) {
		state.selectedCategoryParentId = payload
	},

	SET_CATEGORIES(state, payload) {
		state.categories = payload;
	},

	ADD_CATEGORY(state, payload) {
		if (payload.parentId !== null && payload.parentId !== undefined) {
			const parentCategoryIndex = state.categories.findIndex(category => category.id === parseInt(payload.parentId));
			state.categories[parentCategoryIndex].subCategories.push(payload);
		} else {
			state.categories.push(payload);
		}
	},

	PATCH_CATEGORY(state, payload) {
		const vm = payload.vm;

		if (payload.category.parentId !== null && payload.category.parentId !== undefined) {
			if (payload.category.originalParentId !== null && payload.category.originalParentId !== undefined) {
				const originalParentCategoryIndex = state.categories.findIndex(category => category.id === parseInt(payload.category.originalParentId));
				const subCategoryIndex = state.categories[originalParentCategoryIndex].subCategories.findIndex(category => category.id === parseInt(payload.category.id));

				Object.keys(payload.category).forEach(key => {
					vm.$set(state.categories[originalParentCategoryIndex].subCategories[subCategoryIndex], key, payload.category[key]);
				});

				// if the subCategory has a new parent
				// remove the subCategory from the actula parent
				// add the subCategory to the new parent
				if (payload.category.originalParentId && !_isEqual(payload.category.originalParentId, payload.parentId)) {
					const subCategory = state.categories[originalParentCategoryIndex].subCategories.find(subCategory => subCategory.id === parseInt(payload.category.id));
					const newParentCategoryIndex = state.categories.findIndex(category => category.id === parseInt(payload.category.parentId));

					delete subCategory.originalParentId;

					state.categories[originalParentCategoryIndex].subCategories.splice(subCategoryIndex, 1);

					state.categories[newParentCategoryIndex].subCategories.push(subCategory);
				}
			} else {

				const newParentCategoryIndex = state.categories.findIndex(category => category.id === parseInt(payload.category.parentId));
				const categoryIndex = state.categories.findIndex(category => category.id === parseInt(payload.category.id));

				const category = state.categories.find(category => category.id === parseInt(payload.category.id));

				category.parentId = payload.category.parentId;
				category.position = payload.category.position;

				state.categories.splice(categoryIndex, 1);

				console.log(newParentCategoryIndex)
				console.log(payload.category.parentId)
				console.log(state.categories[newParentCategoryIndex])

				// not working when moving a category from parent to sub cat of another category
				// something to do with newParentCategoryIndex
				state.categories[newParentCategoryIndex].subCategories.push(category);

			}
		} else {
			const categoryIndex = state.categories.findIndex(category => category.id === parseInt(payload.category.id));

			Object.keys(payload.category).forEach(key => {
				vm.$set(state.categories[categoryIndex], key, payload.category[key]);
			});
		}
	},

	DELETE_CATEGORY(state, payload) {
		if (payload.parentId) {
			const parentCategoryIndex = _findIndex(state.categories, ['id', parseInt(payload.parentId)]);
			const categoryIndex = _findIndex(state.categories[parentCategoryIndex].subCategories, ['id', parseInt(payload.id)]);
			state.categories[parentCategoryIndex].subCategories.splice(categoryIndex, 1);
		} else {
			const categoryIndex = _findIndex(state.categories, ['id', payload.id]);
			state.categories.splice(categoryIndex, 1);
		}
	},

	SET_CATEGORY_DELETED_AT(state, payload) {
		const vm = payload.vm;

		if (payload.category.parentId) {
			const parentCategoryIndex = _findIndex(state.categories, ['id', parseInt(payload.category.parentId)]);
			const categoryIndex = _findIndex(state.categories[parentCategoryIndex].subCategories, ['id', parseInt(payload.category.id)]);

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

			// not working when changing the position of a new category when they are moved from category to subcategory and they are new
			// the position change is not visible in the list
			const vm = payload.vm;

			const parentCategoryIndex = state.categories.findIndex(parentCategory => parentCategory.id == payload.parentId);

			const categoryIndex = state.categories[parentCategoryIndex].subCategories.findIndex(category => category.id == payload.id);

			let adjenctCategoryIndex = -1;
			let adjenctCategoryNewPosition = -1;

			if (payload.direction == 1) {
				adjenctCategoryIndex = categoryIndex - 1;

				adjenctCategoryNewPosition = state.categories[parentCategoryIndex].subCategories[adjenctCategoryIndex].position + 1;

				const deleted = state.categories[parentCategoryIndex].subCategories.splice(adjenctCategoryIndex, 1);
				state.categories[parentCategoryIndex].subCategories.splice(categoryIndex, 0, deleted[0]);

			} else {
				adjenctCategoryIndex = categoryIndex + 1;

				adjenctCategoryNewPosition = state.categories[parentCategoryIndex].subCategories[adjenctCategoryIndex].position - 1;

				const deleted = state.categories[parentCategoryIndex].subCategories.splice(categoryIndex, 1);
				state.categories[parentCategoryIndex].subCategories.splice(adjenctCategoryIndex, 0, deleted[0]);
			}

			vm.$set(state.categories[parentCategoryIndex].subCategories[adjenctCategoryIndex], 'position', payload.position);
			vm.$set(state.categories[parentCategoryIndex].subCategories[categoryIndex], 'position', adjenctCategoryNewPosition);

		} catch (error) {
			console.log(error);

		}
	},

	ADD_DISCOUNT(state, payload) {
		let parentCategoryIndex = -1;
		let categoryIndex = -1;

		if (payload.parentId) {
			parentCategoryIndex = state.categories.findIndex(category => category.id === payload.parentId);
			categoryIndex = state.categories[parentCategoryIndex].subCategories.findIndex(category => category.id === payload.id)

			payload.vm.$set(state.categories[parentCategoryIndex].subCategories[categoryIndex], 'discountId', payload.discountId);
		} else {
			categoryIndex = state.categories.findIndex(category => category.id === payload.id);

			payload.vm.$set(state.categories[categoryIndex], 'discountId', payload.discountId);
		}
	},

	REMOVE_DISCOUNT(state, payload) {
		let parentCategoryIndex = -1;
		let categoryIndex = -1;

		if (payload.parentId) {
			parentCategoryIndex = state.categories.findIndex(category => category.id === payload.parentId);
			categoryIndex = state.categories[parentCategoryIndex].subCategories.findIndex(category => category.id === payload.id)

			payload.vm.$set(state.categories[parentCategoryIndex].subCategories[categoryIndex], 'discountId', "");
		} else {
			categoryIndex = state.categories.findIndex(category => category.id === payload.id);

			payload.vm.$set(state.categories[categoryIndex], 'discountId', "");
		}
	},

	REMOVE_PARENT(state, payload) {
		const vm = payload.vm;
		const parentId = payload.parentId;
		const categoryId = payload.id;
		const position = payload.position;

		const parentIndex = state.categories.findIndex(category => category.id == parentId);
		const categoryIndex = state.categories[parentIndex].subCategories.findIndex(category => category.id == categoryId);

		const category = state.categories[parentIndex].subCategories[categoryIndex];

		vm.$set(state.categories[parentIndex].subCategories[categoryIndex], 'parentId', null);
		vm.$set(state.categories[parentIndex].subCategories[categoryIndex], 'position', position);

		state.categories[parentIndex].subCategories.splice(categoryIndex, 1);

		state.categories.push(category);
	}

}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}