<template>
  <Modal @close="cancel">
    <template slot="header">
      {{ title }}
    </template>

    <template slot="body">
      <div class="font-bold my-4">
        {{ mainMessage }}
      </div>

      <div v-if="secondaryMessage">
        {{ secondaryMessage }}
      </div>
    </template>

    <template slot="footer">
      <button
        @click.prevent="ok"
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
        @click.prevent="cancel"
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
  </Modal>
</template>


<script>
import Modal from "./ModalComponent.vue";

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    mainMessage: {
      type: String,
      required: true
    },
    secondaryMessage: {
      type: String,
      required: false,
      default: ""
    }
  },

  methods: {
    cancel() {
      this.$emit('cancel');
    },

    ok() {
      this.$emit('ok')
    }
  },

  components: {
    Modal,
  },
};
</script>