<template>
  <ul>
    <CartItem v-for="item in getCartItems" :key="item.id" :item="item"></CartItem>
  </ul>
</template>

<script>
import CartItem from './CartItemComponent.vue';
import { mapGetters } from 'vuex';
export default {
 
  computed: {
    ...mapGetters("Cart", ["getCartItems"]),
  },
  components: {
    CartItem
  }
}
</script>