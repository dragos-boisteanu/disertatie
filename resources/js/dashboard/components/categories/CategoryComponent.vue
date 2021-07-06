<template>
  <li class="w-full min-w-min my-1 relative">
    <DisabledMarkerComponent
      v-if="isDisabled"
    ></DisabledMarkerComponent>
    <div
      @click="selectCategory(category)"
      class="
        w-full
        text-sm
        rounded-md
        cursor-pointer
        border-white
        hover:bg-gray-100
        hover:shadow-md
        grid grid-cols-5
      "
      :class="{
        'bg-gray-100 shadow-md font-semibold': isSelected,
        'bg-gray-50': isEven,
      }"
    >
      <div class="p-2 text-center font-semibold">{{ index + 1 }}</div>
      <div class="p-2">{{ category.name }}</div>
      <div class="p-2 self-center justify-self-center">
        {{ category.vat }} %
      </div>
      <div class="p-2">
        <span v-if="category.discountId">{{ getDiscount }}</span>
      </div>
      <div class="p-2 self-center justify-self-center">
        {{ category.productsCount }}
      </div>
    </div>

    <ul class="mb-2 pb-2 border-b border-gray"  v-if="isParentSelected">
      <SubCategoryComponent
        v-for="(subcategory, index) in getSubCategories" :key="subcategory.id"
          :subcategory="subcategory"
          :selected-parent-category-id="selectedParentCategoryId"
          :selected-id="selectedId"
          :index="index"
          @selected="selectCategory"
      ></SubCategoryComponent>
    </ul>
  </li>
</template>


<script>
import { mapGetters } from "vuex";
import _find from "lodash/find";

import SubCategoryComponent from './SubCategoryComponent.vue';
import DisabledMarkerComponent from '../DisabledMarkerComponent.vue';

export default {
  props: {
    category: {
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

    isEven() {
      if (this.index % 2 === 0) {
        return true;
      }

      return false;
    },

    isParentSelected() {
      return this.category.id === parseInt(this.selectedParentCategoryId);
    },

    isSelected() {
      return this.category.id === parseInt(this.selectedId);
    },

    isDisabled() {
      return (
        this.category.deletedAt !== null &&
        this.category.deletedAt !== undefined
      );
    },

    getDiscount() {
      const discount = _find(this.getDiscounts, [
        "id",
        parseInt(this.category.discountId),
      ]);
      return `${discount.code} ${discount.id}%`;
    },

    getSubCategories() {
      return this.category.subCategories;
    }
  },
  
  methods: {
    selectCategory(category) {
      this.$emit("selected", category);
    },
  },

  components: {
    SubCategoryComponent,
    DisabledMarkerComponent
  }
};
</script>