<template>
  <ul>
    <CartItem v-for="item in getCartItems" :key="item.id" :item="item"></CartItem>
  </ul>
</template>

<script>
import CartItem from './CartItemComponent.vue';

export default {
  props: {
    items: {
      type: Array,
      required: true,
    }
  },
  components: {
    CartItem
  }
}
</script>