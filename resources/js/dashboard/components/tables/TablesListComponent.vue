<template>
  <!-- max-h-80 md:max-h-96 -->
  <div class="overflow-x-auto bg-white shadow rounded-sm p-5">
    <div class="min-w-[450px]">
      <div
        class="bg-gray-700 text-orange-500 text-left text-sm grid grid-cols-4"
      >
        <div class="p-2 self-center justify-self-center">Index</div>
        <div class="p-2 self-center justify-self-center">Name</div>
        <div class="p-2 self-center justify-self-center">Seats</div>
        <div class="p-2 self-center justify-self-center">Status</div>
      </div>
      <ul class="overflow-y-auto max-h-[400px] w-full px-2 rounded-sm">
        <TableComponent
          v-for="(table, index) in getTables"
          :key="table.id"
          :table="table"
          :selected-id="selectedId"
          :index="index"
          @selected="selectTable"
        ></TableComponent>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import TableComponent from "./TableComponent.vue";

export default {
  props: {
    selectedId: {
      type: [Number, String],
      required: false,
      default: null,
    },
  },

  computed: {
    ...mapGetters("Tables", ["getTables"]),
  },

  methods: {
    selectTable(tableId) {
      this.$emit("selected", tableId);
    },
  },

  components: {
    TableComponent,
  },
};
</script>