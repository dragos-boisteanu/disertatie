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
          :key="category.id"
          :category="category"
          :selected-parent-category-id="selectedParentCategoryId"
          :selected-id="selectedId"
          :index="index"
          @selected="selectCategory"
        ></CategoryComponent>
      </ul>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";

import _find from "lodash/find";

import CategoryComponent from "./CategoryComponent.vue";

export default {
  props: {
    selectedCategory: {
      type: Object,
      required: false,
      default: null,
    },
  },

  computed: {
    ...mapGetters("Discounts", ["getDiscounts"]),
    ...mapGetters("Categories", ["getCategories"]),

    selectedId() {
      if (
        this.selectedCategory !== null &&
        this.selectedCategory !== undefined
      ) {
        return this.selectedCategory.id;
      }
      return -1;
    },
  },

  data() {
    return {
      selectedParentCategoryId: "",
      selectedSubCategories: [],
    };
  },

  watch: {
    selectedCategory(newValue) {
      if (newValue !== null && newValue !== undefined) {
        if (newValue.parentId === null || newValue.parentId === undefined) {
          this.selectedParentCategoryId = newValue.id;
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
        this.selectedParentCategoryId = "";
      }
    },
  },

  methods: {
    selectCategory(category) {
      this.$emit("selected", category);
    },
  },

  components: {
    CategoryComponent,
  },
};
</script>