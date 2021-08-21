<template>
  <div class="overflow-x-auto bg-white shadow rounded-sm p-5">
    <div class="min-w-[450px]">
      <div
        class="bg-gray-700 text-orange-500 text-left text-sm grid grid-cols-5"
      >
        <div class="p-2 self-center justify-self-center">Index</div>
        <div class="p-2 self-center justify-self-center">Name</div>
        <div class="p-2 self-center justify-self-center">Vat</div>
        <div class="p-2 self-center justify-self-center">Discount</div>
        <div class="p-2 self-center justify-self-center">Products Count</div>
      </div>
      <ul class="overflow-y-auto max-h-[400px] w-full px-2 rounded-sm" @>
        <CategoryComponent
          v-for="(category, index) in getCategories"
          :key="category.index"
          :category="category"
          :index="index"
        ></CategoryComponent>
      </ul>
    </div>
  </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";

import _find from "lodash/find";

import CategoryComponent from "./CategoryComponent.vue";

export default {
  computed: {
    ...mapGetters("Discounts", ["getDiscounts"]),
    ...mapGetters("Categories", ["getCategories", "getSelectedCategory"]),
  },

  data() {
    return {
      selectedSubCategories: [],
    };
  },

  watch: {
    getSelectedCategory(newValue) {
      if (newValue !== null && newValue !== undefined) {
        if (newValue.parentId === null || newValue.parentId === undefined) {
          this.setSelectedCategoryParentId(newValue.id);
          this.selectedSubCategories = newValue.subCategories;

          if (newValue.selectedSubcateogryId) {
            const selectedSubCategory = _find(newValue.subCategories, [
              "id",
              parseInt(newValue.selectedSubcateogryId),
            ]);

            this.selectCategory(selectedSubCategory);

            delete newValue.selectedSubcateogryId;
          }
        }
      } else {
        this.setSelectedCategoryParentId(null);
      }
    },
  },

  methods: {
    ...mapActions("Categories", [
      "setSelectedCategory",
      "setSelectedCategoryParentId",
    ]),

    selectCategory(category) {
      this.setSelectedCategory(category);
    },
  },

  components: {
    CategoryComponent,
  },
};
</script>