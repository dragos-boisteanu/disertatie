import {downloadProducts, downloadProduct, storeProduct, patchProduct, disableProductm, downloadProductByBarcode} from '../../api/products.api';
import _orderBy from 'lodash/orderBy';
import _find from 'lodash/find';

const initialState = () => ({
    products: [],
    pagination: {},
});

const state = initialState();

const getters = {
    getProducts: (state) => state.products,
    getNextPage: (state) => state.nextPage,
    getPaginationData: (state) => state.pagination,
}

const actions = {
    reset({ commit }) {
        commit('RESET');
    },
    
    async fetchProducts({commit}, payload) {
        try {
            const response = await downloadProducts(payload);
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

    getProduct({state}, id) {
        try {
            let product = _.find(state.products, ['id', id]);
            if(product) {
                return product;
            }
            return this.fetchProduct(id);
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

    sortProductsList({commit}, sortBy) {
        commit('SORT_PRODUCTS', sortBy);
    }
}

const mutations = {
    RESET(state) {
        const newState = initialState();
        Object.keys(newState).forEach(key => {
            state[key] = newState[key]
        })
    },

    SET_PRODUCT(state, payload) {
        state.products = payload;
    },

    SET_PAGINATION(state, payload) {
        state.pagination = payload;
    },

    SORT_PRODUCTS(state, orderBy) {
        switch(orderBy) {
            case 1:
                state.products = _orderBy(state.products, [product => product.name.toLowerCase()], ['asc']);
                break;
            case 2:
                state.products = _orderBy(state.products, [product => product.name.toLowerCase()], ['desc']);
                break;
            case 3:
                state.products = _orderBy(state.products, [product => parseFloat(product.base_price.replace(',', '.'))], ['asc']);
                break;
            case 4:
                state.products = _orderBy(state.products, [product =>  parseFloat(product.base_price.replace(',', '.'))], ['desc']);
                break;
            case 5:
                state.products = _orderBy(state.products, [product => product.quantity], ['asc']);
                break;
            case 6: 
                state.products = _orderBy(state.products, [product => product.quantity], ['desc']);
                break;
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