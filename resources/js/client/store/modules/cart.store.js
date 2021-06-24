import {
  addItemTocart,
  patchItem,
  removeItemFromCart
} from "../../api/cart.api.js"

import _findIndex from 'lodash/findIndex'

const initialState = () => ({
  showCart: false,
  cart: {
    id: 0,
    items: [],
  }
})

const state = initialState();

const getters = {
  getCartItems: (state) => {
    console.log('here');
    return state.cart.items;
  },

  getCartId: (state) => state.cart.id,
  getCartItemsCount: (state) => {
    let count = 0;
    state.cart.items.forEach(item => {
      count += item.quantity;
    });

    return parseInt(count);
  },
  getShowCart: (state) => state.showCart
}

const actions = {
  async addItemToCart({ commit }, payload) {
    const response = await addItemTocart(payload.item);

    payload.item.quantity = response.data.newQuantity;
    payload.item.name = response.data.name;
    payload.item.price = response.data.price;
    
    commit('ADD_ITEM', payload);
  },
  async pathItem({ commit }, payload) {
    await patchItem(payload.item);

    commit('PATCH_ITEM', payload.item.id)
  },

  async removeItem({ commit }, payload) {
    await removeItemFromCart(payload.item);

    commit('REMOVE_ITEM', payload)
  },

  setCartItems({ commit }, items) {
    commit('SET_ITEMS', items);
  },

  toggleCartState({ commit }) {
    commit('TOGLE_STATE');
  }

}

const mutations = {
  ADD_ITEM(state, payload) {
    const itemIndex = _findIndex(state.cart.items, ['id', payload.item.id]);
    if (itemIndex > -1) {
      payload.vm.$set(state.cart.items[itemIndex], 'quantity', payload.item.quantity)
    } else { 
      
      state.cart.items.push(payload.item); 
    }
  },

  PATCH_ITEM(state, payload) {
    const itemIndex = _findIndex(state.cart.items, ['id', payload.item.id]);

    payload.vm.$set(state.cart.items[itemIndex], 'quantity', payload.item.quantity);
  },

  REMOVE_ITEM(state, itemId) {
    const itemIndex = __findIndex(state.cart.items, ['id', itemId]);

    state.cart.items.splice(itemIndex, 1);
  },

  SET_ITEMS(state, items) {
    state.cart.items = items;
  },

  TOGLE_STATE(state) {
    state.showCart = !state.showCart;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}