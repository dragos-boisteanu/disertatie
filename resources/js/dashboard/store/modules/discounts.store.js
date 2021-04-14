import {downloadDiscounts, postDiscount, patchDiscount, deleteDiscount, disableDiscount, restoreDiscount } from '../../api/discounts.api';
import _findIndex from 'lodash/findIndex';

const initialState = () => ({
    discounts: null,
})

const state = initialState();

const getters = {

    getDiscounts(state) {
        return state.discounts;
    }
}

const actions = {
    reset({ commit }) {
        commit('RESET');
    },

    async downloadDiscounts({commit}) {
        try {
            const response = await downloadDiscounts();
            console.log(response.data.data.discounts)
            commit('SET_DISCOUNTS', response.data.data.discounts)
        } catch (error) {
            throw error;
        }
    },

    async postDiscount({commit}, payload) {
        try {
            const response = await postDiscount(payload);
            payload.id = response.data;
            commit('ADD_DISCOUNT', payload);
        } catch ( error ) {
            throw error;
        }
    },

    async patchDiscount({commit}, payload) {
        try {
            await patchDiscount(payload.discount);
            commit('PATCH_DISCOUNT', payload);
        } catch ( error ) {
            throw error;
        }
    },

    async disableDiscount({commit}, payload) {
        try {
            const response = await disableDiscount(payload.id);
            payload.deleted_at = response.data.deleted_at;
            commit('DISABLE_DISCOUNT', payload);
        } catch ( error ) {
            throw error;
        }
    },

    async deleteDiscount({commit}, payload) {
        try {
            await deleteDiscount(payload.id);
            commit('DELETE_DISCOUNT', payload);
        } catch (error) {
            throw error
        }
    },

    async restoreDiscount({commit}, payload) {
        try {
            await restoreDiscount(payload.id);
            commit('RESTORE_DISCOUNT', payload)
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

    SET_DISCOUNTS(state, payload) {
        state.discounts = payload;
    },

    ADD_DISCOUNT(state, payload) {
        state.discounts.push(payload);
    },

    PATCH_DISCOUNT(state, payload) {
        const vm = payload.vm;
        const discount = payload.discount;
        const discountIndex = _findIndex(state.discounts, ['id', discount.id]);

        Object.keys(discount).forEach(key => {
            vm.$set(state.discounts[discountIndex], key, discount[key]);
        });
    },

    DISABLE_DISCOUNT(state, payload) {
        const vm = payload.vm;
        const discountId = payload.id;
        const deletedAt = payload.deletedAt;
        const discountIndex = _findIndex(state.discounts, ['id', discountId]);

        vm.$set(state.discounts[discountIndex], 'deletedAt', deletedAt);
    },

    DELETE_DISCOUNT(state, payload) {
        const discountIndex = _findIndex(state.discounts, ['id', payload.id]);
        state.discounts.splice(discountIndex, 1);
    },

    RESTORE_DISCOUNT(state, payload) {
        const vm = payload.vm;
        const discountId = payload.id;
        const discountIndex = _findIndex(state.discounts, ['id', discountId]);

        vm.$set(state.discounts[discountIndex], 'deletedAt', null);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}