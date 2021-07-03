<template>
  <ViewContainer>
    <template slot="header">
      <div class="flex items-center justify-between md:justify-start gap-x-4">
        <span> Categories </span>
        <button
          @click="refresh"
          class="
            p-1
            bg-sky-600
            rounded-sm
            active:shadow-inner
            active:bg-sky-500
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#ffffff"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
            />
          </svg>
        </button>
      </div>
    </template>

    <div
      class="w-full flex flex-col gap-4 lg:flex-row lg:flex xl:w-3/4 2xl:w-3/4"
    >
      <div class="flex flex-col lg:flex-auto">
        <Search :reset="resetSearchValue" @reseted="searchValueReseted"></Search>
        <CategoriesList
          :selected-category="selectedCategory"
          @selected="selectCategory"
        ></CategoriesList>
      </div>

      <div>
        <CategoryForm
          :selected-category="selectedCategory"
          @selectNewParentCategory="selectCategory"
          @resetCategory="deselectCatgory"
        ></CategoryForm>
      </div>
    </div>
  </ViewContainer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import ViewContainer from "../ViewContainer";

import CategoriesList from "../../components/categories/CategoriesListComponent.vue";
import CategoryForm from "../../components/categories/CategoryFormComponent";
import Search from "../../components/categories/SearchComponent.vue";

import _find from "lodash/find";
import _debounce from "lodash/debounce";
import _isEqual from "lodash/isEqual";

export default {
  computed: {
    ...mapGetters("Categories", ["getCategories"]),

    selectedCategoryId() {
      return this.selectedCategory !== null && this.selectedCategory !== undefined ? this.selectedCategory.id : null
    }
  },

  data() {
    return {
      selectedCategory: null,
      resetSearchValue: false,
    };
  },

  methods: {
    ...mapActions("Categories", ["fetchCategories"]),
    ...mapActions("Notification", ["openNotification"]),

    selectCategory(category) {
      // const category = _find(this.getCategories, ["id", parseInt(id)]);
      this.selectedCategory = category;
    },

    deselectCatgory() {
      this.selectedCategory = null;
    },

    async refresh() {
      try {
        await this.fetchCategories();
        this.deselectCatgory();
        this.resetSearchValue = true;
      } catch (error) {
        console.log(error);
      }
    },

    searchValueReseted() {
      this.resetSearchValue = false;
    },

  },

  components: {
    ViewContainer,
    CategoriesList,
    CategoryForm,
    Search,
  },
};
</script>