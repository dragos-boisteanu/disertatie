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

    async addProduct({commit}, payload) {
        try {
            const response = await storeProduct(payload);
        } catch ( error ) {
            throw error;
        }
    },

    async getProductByBarcode({}, payload) {
        try {
            console.log(payload)
            const response = await downloadProductByBarcode(payload);
            return response;
        } catch ( error ) {
            throw error;
        }
    }
}

const mutations = {

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}