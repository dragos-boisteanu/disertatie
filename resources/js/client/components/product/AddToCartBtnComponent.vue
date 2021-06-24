<template>
  <button
    @click="callAddItemTocart"
    :id="id"
    class="
      self-center
      py-1
      px-2
      text-sm
      rounded
      border border-gray-400
      text-gray-400
      hover:text-gray-200
      hover:border-gray-200
      product-add-to-cart
    "
  >
    Add to cart</button>
</template>


<script>
import { mapActions } from 'vuex';

export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  },

  methods: {
    ...mapActions('Cart', ['addItemToCart']),

    async callAddItemTocart() {
      try {
        const payload = {
          item: {
            id: this.id,
            quantity: this.id
          }
        }
        await this.addItemToCart(payload);
      } catch ( error ) {
        console.log(error)
      }
    }
  }
}
</script>