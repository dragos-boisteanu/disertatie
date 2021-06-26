<template>
  <div class="overflow-x-auto bg-white shadow rounded-sm p-5 max-h-96">
    <div style="min-width: 450px">
      <div
        class="bg-gray-700 text-orange-500 text-left text-sm grid grid-cols-6"
      >
        <div class="p-2 text-center">Index</div>
        <div class="p-2">Name</div>
        <div class="p-2">Vat</div>
        <div class="p-2">Discount</div>
        <div class="p-2">Products Count</div>
        <div class="p-2">Parent</div>
      </div>
      <ul class="w-full px-2 rounded-sm">
        <li
          class="w-full min-w-min my-1"
          v-for="(category, index) in parentCategories"
          :key="category.id"
        >
          <div
            @click="selectCategory(category.id)"
            class="
              w-full
              text-sm
              rounded-md
              cursor-pointer
              border-white
              hover:bg-gray-50
              hover:shadow-md
              grid grid-cols-6
            "
            :class="{ 'bg-gray-50 shadow-md': category.id == selectedId }"
          >
            <div class="p-2 text-center font-semibold">{{ index + 1 }}</div>
            <div class="p-2">{{ category.name }}</div>
            <div class="p-2">{{ category.vat }} %</div>
            <div class="p-2">
              <span v-if="category.discountId">{{
                getDiscountForCategory(category.discountId)
              }}</span>
            </div>
            <div class="p-2 max-w-4">{{ category.productsCount }}</div>
          </div>

          <ul>
            <li
              class="w-full min-w-min my-1"
              @click="selectCategory(subCategory.id)"
              v-for="(subCategory, index) in getSubCategories(category.id)"
              :key="index"
            >
              <div
                class="
                  w-full
                  text-sm
                  rounded-md
                  cursor-pointer
                  border-white
                  hover:bg-gray-50
                  hover:shadow-md
                  grid grid-cols-6
                "
                :class="{
                  'bg-gray-50 shadow-md': subCategory.id == selectedId,
                }"
              >
                <div class="p-2 text-center font-semibold">{{ index + 1 }}</div>
                <div class="p-2">{{ subCategory.name }}</div>
                <div class="p-2">{{ subCategory.vat }} %</div>
                <div class="p-2">
                  <span v-if="subCategory.discountId">{{
                    getDiscountForCategory(subCategory.discountId)
                  }}</span>
                </div>
                <div class="p-2 max-w-4">{{ subCategory.productsCount }}</div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import _find from "lodash/find";

export default {
  props: {
    categories: {
      type: Array,
      required: true,
    },
    selectedId: {
      type: [Number, String],
      required: false,
      default: "",
    },
  },

  computed: {
    ...mapGetters("Discounts", ["getDiscounts"]),

    parentCategories() {
      return this.categories.filter((category) => category.parentId === null);
    },

    subCategories() {
      return this.categories.filter((category) => category.parentId !== null);
    },
  },

  methods: {
    selectCategory(categoryId) {
      this.$emit("selected", categoryId);
    },

    getSubCategories(categoryId) {
      return this.categories.filter(
        (category) => category.parentId === categoryId
      );
    },

    getDiscountForCategory(id) {
      const discount = _find(this.getDiscounts, ["id", parseInt(id)]);
      return `${discount.code} ${discount.id}%`;
    },
  },
};
</script>