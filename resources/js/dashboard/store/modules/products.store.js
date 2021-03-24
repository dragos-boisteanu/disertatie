import {downloadProducts, downloadProduct, storeProduct, patchProduct, disableProductm, downloadProductByBarcode} from '../../api/products.api';

const initialState = () => ({
    products: [],
    nextPage: 1
});

const state = initialState();

const getters = {
    getProducts: (state) => state.products,
    getNextPage: (state) => state.nextPage,
}

const actions = {
    reset({ commit }) {
        commit('RESET');
    },
    
    async addProduct({commit}, payload) {
        try {
            const response = await storeProduct(payload);
        } catch ( error ) {
            throw error;
        }
    },

    async getProductByBarcode({}, payload) {
        try {
            const response = await downloadProductByBarcode(payload);
            return response;
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
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}