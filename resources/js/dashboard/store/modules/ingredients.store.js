import { downloadIngredients, postIngredient, patchIngredient, deleteIngredient } from '../../api/ingreditents.api.js'
import _findIndex from 'lodash/findIndex';

const initialState = () => ({
    ingredients: [],
});

const state = initialState();

const getters = {
    getIngredients: (state) => state.ingredients,
}

const actions = {

    reset({commit}) {
        commit('RESET');
    },

    async downloadIngredients({commit}) {
        try {
            const response = await downloadIngredients();

            commit('SET_INGREDIENTS', response.data.data.ingredients);
        } catch ( error ) {
            throw error;
        }
    },

    async postIngredient({commit}, payload) {
        try {
            const response = await postIngredient(payload);
            payload.id = response.data;
            commit('ADD_INGREDIENT', payload);
        } catch ( error ) {
            throw error;
        }
    },

    async patchIngredient({commit}, payload) {
        try {
            await patchIngredient(payload.ingredient);
            commit('PATCH_INGREDIENT', payload);
        } catch ( error ) {
            throw error;
        }
    },

    async deleteIngredient({commit}, payload) {
        try {
            await deleteIngredient(payload);
            commit('REMOVE_INGREDIENT', payload);
        } catch( error ) {
            throw error;
        }
    }
}

const mutations = {
    RESET(state) {
        const newState = initialState();
        Object.keys(newState).forEach(key => {
            state[key] = newState[key];
        });
    },

    SET_INGREDIENTS(state, payload) {
        state.ingredients = payload;
    },

    ADD_INGREDIENT(state, payload) {
        state.ingredients.push(payload)
    },

    PATCH_INGREDIENT(state, payload) {
        const ingredientIndex = _findIndex(state.ingredients, ['id', payload.ingredient.id]);
        const vm = payload.vm;

        Object.keys(payload.ingredient).forEach(key => {
            if(key === 'addQuantity') {
                vm.$set(state.ingredients[ingredientIndex], 'quantity', parseInt(payload.ingredient['addQuantity']) + state.ingredients[ingredientIndex].quantity );
                // delete state.ingredients[ingredientIndex].addQuantity
            } else {
                vm.$set(state.ingredients[ingredientIndex], key, payload.ingredient[key] );
            }
            
        });
    },

    REMOVE_INGREDIENT(state, payload) {
        const ingredientIndex = _findIndex(state.ingredients, ['id', payload]);

        state.ingredients.splice(ingredientIndex, 1);
    }
    
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

