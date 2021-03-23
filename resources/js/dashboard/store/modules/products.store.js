import {downloadProducts, downloadProduct, storeProduct, patchProduct, disableProductm, checkProduct} from '../../api/products.api';

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

    async testBarcode({}, payload) {
        try {
            console.log(payload)
            const response = await checkProduct(payload);
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