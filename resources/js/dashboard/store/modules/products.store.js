import {downloadProducts, downloadProduct, storeProduct, patchProduct, disableProduct, restoreProduct, deleteProduct, downloadProductByBarcode} from '../../api/products.api';
import _orderBy from 'lodash/orderBy';
import _findIndex from 'lodash/findIndex';

const initialState = () => ({
    products: [],
    orderedProducts: [],
    pagination: {},
    filtered: false,
});

const state = initialState();

const getters = {
    getProducts: (state) => state.products,
    getNextPage: (state) => state.nextPage,
    getPaginationData: (state) => state.pagination,
    getFilteredState: (state) => state.filtered,
}

const actions = {
    reset({ commit }) {
        commit('RESET');
    },

    setFilteredState({commit}, payload) {
        commit('SET_FILTERED_STATE', payload);
    },
    
    async fetchProducts({commit}, query) {
        try {
            const response = await downloadProducts(query);
            commit('SET_PRODUCT', response.data.data.products);

            const meta = response.data.meta;
            const paginationData = {
                current_page: meta.current_page,
                last_page: meta.last_page,
            };
        
            commit('SET_PAGINATION', paginationData)

        } catch ( error ) {
            throw error
        }
    },

    async fetchProduct({}, payload) {
        try {
            const response = await downloadProduct(payload);
            return response.data.data;
        } catch ( error ) {
            throw error;
        }
    },

    async updateProduct({commit}, payload ) {
        try {
            const response = await patchProduct(payload.product)
            commit('PATCH_PRODUCT', payload);
            return response;
        } catch ( error ) {
            throw error;
        }
    },

    getProduct({state}, id) {
        try {
            let product = _.find(state.products, ['id', parseInt(id)]);
            return product;
        } catch ( error ) {
            throw error
        }
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
    },

    async disableProduct({commit}, payload) {
        try {
            const response = await disableProduct(payload.id);
            commit('UPDATE_PRODUCT_STATUS', payload);
            return response.data;
        } catch ( error ) {
            throw error
        }
    },

    async restoreProduct({commit}, payload) {
        try {   
            const response = await restoreProduct(payload.id);
            payload.deleted_at = response.data.deleted_at;
            commit('UPDATE_PRODUCT_STATUS', payload);
            return response.data;

        } catch ( error ) {
            throw error;
        }
    },

    async deleteProduct({commit}, payload) {
        try {
            const response = await deleteProduct(payload);
            commit('DELETE_PRODUCT', payload);
            return response.message;
        } catch ( error ) {
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

    SET_FILTERED_STATE(state, payload) {
        state.filtered = payload;
    },

    SET_PRODUCT(state, payload) {
        state.products = payload;
    },

    SET_PAGINATION(state, payload) {
        state.pagination = payload;
    },

    PATCH_PRODUCT(state, payload) {
        if(state.products.length > 0 ) {
            const selectedProductIndex = _findIndex(state.products, ['id', payload.product.id]);
            const vm = payload.vm;

            // TO DO: update stock quantity for products that require ingredients
            Object.keys(payload.product).forEach(key => {
                vm.$set(state.products[selectedProductIndex], key, payload.product[key]);
            })
        }
    },

    UPDATE_PRODUCT_STATUS(state, payload) {
        if(state.products.length > 0) {
            const selectedProductIndex = _findIndex(state.products, ['id', payload.id]);
            const vm = payload.vm;
            vm.$set(state.products[selectedProductIndex], 'updated_at', payload.deleted_at);
        }
    },

    DELETE_PRODUCT(state, payload) {
        if(state.products.length > 0) {
            const selectedProductIndex = _findIndex(state.products, ['id', payload]);
            state.products.splice(selectedProductIndex, 1);
        }
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}