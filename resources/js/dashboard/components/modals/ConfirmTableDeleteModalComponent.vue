<template>
  <Modal
    @close="close"
  >
  <template slot="header">
    Confirm action
  </template>

  <template slot="body">
    <div>
      Confirm deletion of table #{{tableId}}
    </div>
    <div class="text-sm font-light text-gray-400">
      This action will replace table id from all related orders with null
    </div>
    
  </template>

  <template slot="footer">
    <button 
      @click.prevent="submit" 
      class="flex items-center bg-lightBlue-700 rounded-sm text-xs py-1 px-4 mr-2 text-white mt-2 hover:bg-lightBlue-600 active:bg-lightBlue-500 active:shadow-inner  disabled:bg-gray-500 disabled:pointer-events-none"
    >
      Ok
    </button>
    <button 
      @click.prevent="close"
      class="bg-transparent rounded-sm text-xs py-1 px-4 text-black text-bold mt-2 hover:text-gray-600"
    >
      Cancel
    </button>
  </template>
</Modal>
</template>

<script>

import Modal from './ModalComponent';

export default {
  props: {
    tableId: {
      type: [String, Number],
      required: true
    }
  },

  methods: {
    submit() {
      this.$emit('delete', this.tableId);
    },

    close() {
      this.$emit('closed');
    }
  },

  components: {
    Modal,
  }
}
</script>