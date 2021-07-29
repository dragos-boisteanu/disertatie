<template>
  <li class="w-full min-w-min my-1 relative">
    <div
      @click="selectTable()"
      class="
        w-full
        text-sm
        rounded-md
        cursor-pointer
        border-white
        hover:bg-gray-100
        hover:shadow-md
        grid grid-cols-3
      "
      :class="{
        'bg-gray-100 shadow-md font-semibold': isSelected,
        'bg-gray-50': isEven,
      }"
    >
      <div class="p-2 text-center font-semibold">{{ index + 1 }}</div>
      <div class="p-2 self-center justify-self-center">{{ table.name }}</div>
      <div class="p-2 self-center justify-self-center">
        {{ table.status.name }}
      </div>
    </div>
  </li>
</template>


<script>
export default {
  props: {
    table: {
      type: Object,
      required: true,
    },
    selectedId: {
      type: [Number, String],
      required: false,
      default: null
    },
    index: {
      type: Number,
      required: true,
    },
  },

  computed: {
    isEven() {
      if (this.index % 2 === 0) {
        return true;
      }

      return false;
    },

    isSelected() {
      return this.table.id == this.selectedId;
    },
  },

  methods: {
    selectTable() {
      this.$emit("selected", this.table.id);
    },
  },
};
</script>