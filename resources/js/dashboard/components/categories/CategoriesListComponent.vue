<template>
  <div class="overflow-x-auto bg-white shadow rounded-sm p-5 max-h-[500px]">
    <div style="min-width: 450px">
      <div class="bg-gray-700 text-orange-500 text-left text-sm grid grid-cols-5">
        <div class="p-2 text-center">Index</div>
        <div class="p-2 self-center justify-self-center">Name</div>
        <div class="p-2 self-center justify-self-center">Vat</div>
        <div class="p-2 self-center justify-self-center">Discount</div>
        <div class="p-2 self-center justify-self-center">Products Count</div>
      </div>
      <ul class="w-full px-2 rounded-sm">
        <li
          class="w-full min-w-min my-1"
          v-for="(category, index) in getCategories"
          :key="category.id"
        >
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
              'bg-gray-100 shadow-md font-semibold': category.id == selectedId,
              'bg-gray-50': isEven(index),
            }"
          >
            <div class="p-2 text-center font-semibold">{{ index + 1 }}</div>
            <div class="p-2">{{ category.name }}</div>
            <div class="p-2 self-center justify-self-center">{{ category.vat }} %</div>
            <div class="p-2">
              <span v-if="category.discountId">{{
                getDiscountForCategory(category.discountId)
              }}</span>
            </div>
            <div class="p-2 self-center justify-self-center">{{ category.productsCount }}</div>
          </div>

          <ul class="border-b border-gray" v-if="category.id == selectedParentCategoryId">
            <li
              class="
                w-full
                min-w-min
                my-1
                text-sm
                rounded-md
                cursor-pointer
                border-white
                hover:bg-gray-50
                hover:shadow-md
                grid grid-cols-5
              "
              :class="{
                'bg-gray-50 shadow-md font-semibold':
                  subCategory.id == selectedId,
              }"
              @click="selectCategory(subCategory)"
              v-for="(subCategory, index) in category.subCategories"
              :key="index"
            >
              <div class="p-2 text-center font-semibold">{{ index + 1 }}</div>
              <div class="p-2">{{ subCategory.name }}</div>
              <div class="p-2 self-center justify-self-center">{{ subCategory.vat }} %</div>
              <div class="p-2">
                <span v-if="subCategory.discountId">{{
                  getDiscountForCategory(subCategory.discountId)
                }}</span>
              </div>
              <div class="p-2 self-center justify-self-center">{{ subCategory.productsCount }}</div>
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
    selectedId: {
      type: [Number, String],
      required: false,
      default: "",
    },
  },

  computed: {
    ...mapGetters("Discounts", ["getDiscounts"]),
    ...mapGetters('Categories', ['getCategories']),
  },

  data() {
    return {
      selectedParentCategoryId: '',
      selectedSubCategories: [],
    }
  },

  watch: {
    selectedId(newValue) {
      if(newValue === null || newValue === undefined ) {
        this.selectedParentCategoryId = '';
      }
    },
  },

  methods: {
    selectCategory(category) {
      if(category.parentId === null || category.parentId === undefined ) {
        this.selectedParentCategoryId = category.id;
        this.selectedSubCategories = category.subCategories         
      }
     
      this.$emit("selected", category);
    },

    isEven(index) {
      if (index % 2 === 0) {
        return true;
      }

      return false;
    },

    getDiscountForCategory(id) {
      const discount = _find(this.getDiscounts, ["id", parseInt(id)]);
      return `${discount.code} ${discount.id}%`;
    },
  },
};
</script>