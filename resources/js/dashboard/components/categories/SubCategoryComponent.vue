<template>
  <li
    class="
      relative
      w-full
      min-w-min
      my-1
      text-sm
      cursor-pointer
      hover:bg-gray-100
      hover:shadow-md
      grid grid-cols-5
    "
    :class="{
      'bg-gray-100 shadow-md font-semibold': isSelected,
      'bg-gray-50': isOdd,
    }"
    @click="selectCategory(subcategory)"
  >
    <DisabledMarkerComponent v-if="isDisabled"></DisabledMarkerComponent>
    <div class="p-2 self-center justify-self-center font-semibold">{{ index + 1 }}</div>
    <div class="p-2 self-center">{{ subcategory.name }}</div>
    <div class="p-2 self-center justify-self-center">{{ subcategory.vat }} %</div>
    <div class="p-2 self-center justify-self-center">
      <span v-if="subcategory.discountId">{{ getDiscount }}</span>
    </div>
    <div class="p-2 self-center justify-self-center">{{ subcategory.productsCount }}</div>
  </li>
</template>



<script>
import { mapGetters } from "vuex";
import _find from "lodash/find";

import DisabledMarkerComponent from "../DisabledMarkerComponent.vue";

export default {
  props: {
    subcategory: {
      type: Object,
      required: true,
    },
    selectedParentCategoryId: {
      type: [Number, String],
      required: true,
    },
    selectedId: {
      type: [Number, String],
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },

  computed: {
    ...mapGetters("Discounts", ["getDiscounts"]),

    isOdd() {
      if (this.index % 2 !== 0) {
        return true;
      }

      return false;
    },

    isSelected() {
      return this.subcategory.id === parseInt(this.selectedId);
    },

    isDisabled() {
      return (
        this.subcategory.deletedAt !== null &&
        this.subcategory.deletedAt !== undefined
      );
    },

    getDiscount() {
      const discount = _find(this.getDiscounts, [
        "id",
        parseInt(this.subcategory.discountId),
      ]);
      return `${discount.code} ${discount.id}%`;
    },
  },

  methods: {
    selectCategory(subcategory) {
      this.$emit("selected", subcategory);
    },
  },

  components: {
    DisabledMarkerComponent,
  },
};
</script>