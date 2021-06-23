<template>
  <FilterComponent>
    <template slot="close">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="black"
        width="24px"
        height="24px"
        @click="close"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path
          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
        />
      </svg>
    </template>
    <template slot="header"> Products Filter </template>
    <div class="mt-5 px-3">
      <input
        id="barcode"
        name="barcode"
        type="text"
        class="
          w-full
          border-b-2 border-sky-600
          p-2
          text-sm
          rounded-sm
          outline-none
        "
        placeholder="Barcode"
        v-model.lazy="localFilterData.barcode"
        @keyup="callFilter"
      />

      <input
        id="name"
        name="name"
        type="text"
        class="
          mt-3
          w-full
          border-b-2 border-sky-600
          p-2
          text-sm
          rounded-sm
          outline-none
        "
        placeholder="Product name"
        v-model.lazy="localFilterData.name"
        @keyup="callFilter"
      />

      <div class="mt-3 pb-2 border-b-2 border-sky-600">
        <div class="mb-2 text-base font-semibold">Categories</div>
        <div class="flex items-center flex-wrap gap-2">
          <div
            class="flex justify-between items-center"
            v-for="category in categories"
            :key="category.id"
          >
            <input
              :id="category.name"
              :name="category.name"
              :value="category.id"
              type="checkbox"
              v-model="localFilterData.categories"
              class="mr-1 outline-none"
              @change="callFilter"
            />
            <label :for="category.name" class="text-sm capitalize">{{
              category.name
            }}</label>
          </div>
        </div>
      </div>

      <div
        class="mt-3 pb-2 border-b-2 border-sky-600"
        v-if="showSubCategories"
      >
        <div class="mb-2 text-base font-semibold">Sub categories</div>
        <div class="flex items-center flex-wrap gap-2">
          <div
            class="flex justify-between items-center"
            v-for="category in subCategories"
            :key="category.id"
          >
            <input
              :id="category.name"
              :name="category.name"
              :value="category.id"
              type="checkbox"
              v-model="localFilterData.subCategories"
              class="mr-1 outline-none"
              @change="callFilter"
            />
            <label :for="category.name" class="text-sm capitalize">{{
              category.name
            }}</label>
          </div>
        </div>
      </div>

      <div class="mt-3 pb-2">
        <div class="mb-2 text-base font-semibold">Price range</div>
        <div class="flex flex-col items-start gap-3 md:flex-row">
          <div class="flex items-center">
            <label class="text-sm font-semibold mr-3" for="priceStart"
              >From:</label
            >
            <input
              type="text"
              id="priceStart"
              name="priceStart"
              v-model="localFilterData.priceStart"
              class="w-full py-1 px-2 text-sm rounded-sm"
              @change="callFilter"
            />
          </div>
          <div class="flex items-center">
            <label class="text-sm font-semibold mr-3" for="priceEnd">To:</label>
            <input
              type="text"
              id="priceEnd"
              name="priceEnd"
              v-model="localFilterData.priceEnd"
              class="w-full py-1 px-2 text-sm rounded-sm"
              @change="callFilter"
            />
          </div>
        </div>
      </div>
    </div>
  </FilterComponent>
</template>

<script>
import FilterComponent from "./FilterComponent";
import { mapActions, mapGetters } from "vuex";
import _debounce from "lodash/debounce";
import _isEmpty from "lodash/isEmpty";
import _find from "lodash/find";

export default {
  props: {
    filterData: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapGetters("Categories", ["getCategories"]),

    categories() {
      return this.getCategories.filter(
        (category) => category.parentId === null
      );
    },

    subCategories() {
      return this.getCategories.filter((category) => {
        return (
          this.localFilterData.categories.filter((categoryId) => {
            return parseInt(category.parentId) === parseInt(categoryId);
          }).length > 0
        );
      });
    },

    showSubCategories() {
      return this.subCategories.length > 0;
    },
  },

  data() {
    return {
      localFilterData: {
        barcode: this.filterData.barcode,
        name: this.filterData.name,
        stockStatus: this.filterData.stockStatus,
        categories: this.filterData.categories,
        subCategories: this.filterData.subCategories,
      },
    };
  },

  methods: {
    ...mapActions("Products", ["fetchProducts", "setFilteredState"]),

    callFilter() {
      try {
        const query = {};

        const selectedSubCategories = [];
        this.getCategories.forEach((category) => {
          this.localFilterData.subCategories.forEach((subCategoryId) => {
            if (category.id == subCategoryId)
              selectedSubCategories.push(category);
          });
        });

        // console.log(selectedSubCategories);

        const data = [];

        selectedSubCategories.forEach((subCategory) => {
          this.localFilterData.categories.forEach((categoryId) => {
            if(subCategory.parentId == categoryId)
              data.push(subCategory.id)
          });
        });
      
        this.localFilterData.subCategories = data;

        Object.keys(this.localFilterData).forEach((key) => {
          if (!_isEmpty(this.localFilterData[key])) {
            query[key] = this.localFilterData[key];
          }
        });

        this.filter(query);
      } catch (error) {
        console.log(error);
      }
    },

    filter(query) {
      this.$emit("filter", query);
    },

    close() {
      this.$emit("closed");
    },
  },

  components: {
    FilterComponent,
  },
};
</script>