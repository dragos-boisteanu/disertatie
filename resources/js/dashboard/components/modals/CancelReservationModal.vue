<template>
  <modal-component @close="close"
    ><template slot="header"> Confirm action </template>

    <template slot="body">
      Confirm canceling of reservation #{{ reservationId }}
    </template>

    <template slot="footer">
      <button
        @click.prevent="submit"
        class="
          flex
          items-center
          bg-sky-700
          rounded-sm
          text-xs
          py-1
          px-4
          mr-2
          text-white
          mt-2
          hover:bg-sky-600
          active:bg-sky-500
          active:shadow-inner
          disabled:bg-gray-500
          disabled:pointer-events-none
        "
      >
        Ok
      </button>
      <button
        @click.prevent="close"
        class="
          bg-transparent
          rounded-sm
          text-xs
          py-1
          px-4
          text-black text-bold
          mt-2
          hover:text-gray-600
        "
      >
        Cancel
      </button>
    </template>
  </modal-component>
</template>


<script>
import ModalComponent from "./ModalComponent.vue";

export default {
  props: {
    reservationId: {
      type: Number,
      requried: true,
    },
  },

  methods: {
    close() {
      this.$emit("close");
    },
    submit() {
      this.$emit("confirm");
    },
  },
  components: {
    ModalComponent,
  },
};
</script>