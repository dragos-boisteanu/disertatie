<template>
  <div class="overflow-x-auto flex flex-col bg-white shadow rounded-sm p-5 md:flex-0">
    <table class="px-2 w-full table-auto rounded-sm max-h-80 md:max-h-96">
      <thead class="w-full bg-gray-700 text-orange-500">
        <tr class="text-left text-sm">
          <th class="p-2 text-center">Index</th>
          <th class="p-2">Color</th>
          <th class="p-2">Name</th>
          <th class="p-2">Vat</th>
          <th class="p-2">Discount</th>
          <th class="p-2">Products Count</th>
        </tr>
      </thead>
      <tbody class="max-h-36 overflow-y-auto">
        <tr
          v-for="(category, index) in categories"
          :key="category.id"
          @click="selectCategory(category.id)"
          class="
            duration-500
            ease-in-out
            text-sm
            rounded-md
            cursor-pointer
            border-white
            transform
            hover:scale-105
            hover:bg-gray-50
            hover:shadow-md
          "
        >
          <td class="p-2 text-center font-semibold">{{ index + 1 }}</td>
          <td class="p-2">
            <div
              class="rounded w-4 h-4"
              :style="{ background: category.color }"
            ></div>
          </td>
          <td class="p-2">{{ category.name }}</td>
          <td class="p-2">{{ category.vat }} %</td>
          <td class="p-2">
            <span v-if="category.discountId">{{
              getDiscountForCategory(category.discountId)
            }}</span>
          </td>
          <td class="p-2 max-w-4">{{ category.productsCount }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>

import {mapGetters } from "vuex"

import _find from "lodash/find";

export default {
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },

  computed: {
    ...mapGetters("Discounts", ["getDiscounts"]),
  },

  methods: {
    selectCategory(categoryId) {
      this.$emit("selected", categoryId);
    },

    getDiscountForCategory(id) {
      const discount = _find(this.getDiscounts, ["id", parseInt(id)]);
      return `${discount.code} ${discount.id}%`;
    },

  },
};
</script>