<template>
  <div
    class="
      relative
      w-full
      bg-white
      p-2
      group-hover:block
      lg:min-w-[300px]
      lg:rounded-sm
    "
  >
    <div
      class="
        flex
        items-center
        justify-between
        border-b border-gray-800
        pb-1
        mb-1
      "
    >
      <h4 class="text-lg font-semibold">Cart</h4>
    </div>
    <CartItemsList></CartItemsList>
    <div class="w-full text-center mt-2 flex justify-between text-sm" v-if="hasItems">
      <form method="GET" action="/">
        <button
          class="
            w-full
            rounded-sm
            text-white
            bg-green-600
            px-4
            py-1
            active:shadow-inner
            hover:bg-green-500
          "
        >
          Go to checkout
        </button>
      </form>

      <form method="GET" action="/cart">
        <button
          class="
            w-full
            rounded-sm
            text-white
            bg-sky-600
            px-4
            py-1
            active:shadow-inner
            hover:bg-sky-500
          "
        >
          View Cart
        </button>
      </form>
    </div>
    <div v-else class="w-full bg-blue-500 font-medium text-xs text-white rounded py-1 px-2">
      Cosul de cumparaturi este gol
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CartItemsList from "./CartItemsListComponent.vue";

export default {
  computed: {
    ...mapGetters('Cart', ['getCartItemsCount']),
    hasItems() {
      return this.getCartItemsCount > 0
    }
  },

  components: {
    CartItemsList,
  },
};
</script>