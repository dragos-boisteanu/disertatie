<template>
  <div class="text-center flex flex-col justify-center gap-y-1">
    <input type="number" :value="quantity" class="text-center bg-gray-100 rounded-sm border text-sm " />
    <button  @click="updateQuantity" class="text-sm text-sky-700 hover:text-sky-500">Actualizeaza</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    propQuantity: {
      type: Number,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },

  data() {
    return {
      quantity: this.propQuantity
    }
  },

  methods: {
    ...mapActions('Cart', ['updateQuantity']),

    async callUpdateQuantity() {
      try {
        if(this.quantity != this.propQuantity) {
          const payload = {
            item: {
              id: this.id,
              quantity: this.quantity
            },
            vm:this
          }
          await this.updateQuantity(payload)
        }
      } catch  (error) {
        this.quantity = propQuantity;
        console.log(error);
      }
    }
  }
};
</script>