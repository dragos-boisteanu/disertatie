<template>
  <button
    v-if="hasStock"
    @click="callAddItemTocart"
    :id="id"
    class="
    text-cemter
      self-center
      py-1
      px-2
      text-sm
      rounded
      border border-gray-200
      text-gray-200
      lg:border-gray-400
      lg:text-gray-400
      hover:text-gray-200
      hover:border-gray-200
    "
  >
    Add to cart
  </button>
  <div
  :id="id"
    v-else
    class="
    text-center
      self-center
      py-1
      px-2
      text-sm
      rounded
      border border-red-600
      text-red-600
    "
  >
    Out of stock
  </div>
</template>


<script>
import { mapActions } from "vuex";

export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: false,
      defualt: 0,
    },
  },

  computed: {
    hasStock() {
      return this.stock > 0;
    },
  },

  methods: {
    ...mapActions("Cart", ["addItemToCart"]),

    async callAddItemTocart() {
      try {
        const payload = {
          item: {
            id: this.id,
            quantity: this.quantity,
          },
          vm: this,
        };
        await this.addItemToCart(payload);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>