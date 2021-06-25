<template>
  <div class="relative">
    <button class="absolute right-2 top-2 z-10 lg:hidden" v-if="getShowCart" @click="toggleCartState">
      <svg
        class="fill-current"
        :class="{'text-white': !hasItems}"
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 0 24 24"
        width="24px"
        fill="#000000"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path
          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
        />
      </svg>
    </button>
    <Cart v-if="getShowCart"></Cart>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Cart from "./CartComponent.vue";
export default {
  computed: {
    ...mapGetters("Cart", ["getShowCart", 'getCartItemsCount']),
     hasItems() {
      return this.getCartItemsCount > 0
    }
  },

  methods: {
    ...mapActions("Cart", ['toggleCartState'])
  },
  components: {
    Cart,
  },
};
</script>