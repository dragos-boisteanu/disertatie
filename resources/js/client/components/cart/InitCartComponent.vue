<template>
  <div class="hidden"></div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  props: {
    cartItems: {
      type: Array,
      required: true,
    },
  },

  mounted() {
    this.setCartItems(this.cartItems);
  },

  methods: {
    ...mapActions("Cart", ["setCartItems"]),
  },
};
</script>