import {downloadProductStockDetails, downloadIngredientStockDetails, updateStock } from '../../api/stocks.api'

const initialState = () => ({
    productStockDetails: null,
    ingredientStockDetails: null
});

const state = initialState();

const getters = {
    getProductStockDetails(state) {
        return state.productStockDetails
    },

    getIngredientStockDetails() {
        return state.ingredientStockDetails;
    }
}

const actions = {
    resetStockStore({ commit }) {
        commit('RESET');
    },

    clearIngredientStockDetails({commit}) {
        commit('CLEAR_INGREDIENT_STOCK_DETAILS')
    },

    async downloadProductStockDetails({commit}, barcode) {
        try {
            const response = await downloadProductStockDetails(barcode)
            const product = response.data.data;
            product.barcode = barcode;
            commit('SET_PRODUCT_STOCK_DETAILS', response.data.data)
        } catch (error) {
            throw error;
        }
    },

    async downloadIngredientStockDetails({commit}, payload) {
        try {
            console.log(payload)
            const response = await downloadIngredientStockDetails(payload);
            commit('SET_INGREDIENTS_STOCK_DETAILS', response.data.data);
        } catch ( error ) {
            throw error
        }
    },

    async updateStock({commit}, payload) {
        try {
            const response = await updateStock(payload);
            if(payload.data.type === "product") {
                commit('PATCH_PRODUCT_STOCK_DETAILS', response.data.quantity)
            } else if (payload.data.type === 'ingredient') {
                commit('PATCH_INGREDIENT_STOCK_DETAILS', response.data.quantity)
            }
            
            return response
        } catch ( error ) {
            throw error 
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

    SET_PRODUCT_STOCK_DETAILS(state, payload) {
        state.productStockDetails = payload;
    },

    SET_INGREDIENTS_STOCK_DETAILS(state, payload) {
        state.ingredientStockDetails = payload;
    },

    PATCH_PRODUCT_STOCK_DETAILS(state, payload) {
        state.productStockDetails.quantity = parseInt(payload)        
    },

    PATCH_INGREDIENT_STOCK_DETAILS(state, payload) {
        state.ingredientStockDetails.quantity = parseInt(payload)
    },

    CLEAR_INGREDIENT_STOCK_DETAILS(state) {
        state.ingredientStockDetails = null
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}