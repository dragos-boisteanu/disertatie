<template>
  <ViewContainer>
    <template slot="header">
      <div class="flex items-center justify-between md:justify-start gap-x-4">
        <span> Categories </span>
        <button
          @click="refresh"
          class="
            p-1
            bg-lightBlue-600
            rounded-sm
            active:shadow-inner
            active:bg-lightBlue-500
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

    <div class="w-full flex flex-col gap-4 lg:flex-row lg:flex xl:w-3/4 2xl:w-2/3">
      <div class="flex flex-col gpa-y-4">
        <Search
          @search="search"
        ></Search>
        <CategoriesList
          :categories="getCategories"
          @selected="selectCategory"
        ></CategoriesList>
      </div>

      <CategoryForm
        :category-id="categoryId"
        @resetCategory="deselectCatgory"
      ></CategoryForm>
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

    showResetSearch() {
      return this.searchInput.length > 0;
    },
  },

  data() {
    return {
      searchInput: "",
      categoryId: "",
    };
  },

  methods: {
    ...mapActions("Categories", ["searchCategory", "fetchCategories"]),
    ...mapActions("Notification", ["openNotification"]),

    selectCategory(id) {
      const category = _find(this.getCategories, ["id", id]);
      this.categoryId = category.id;
    },

    deselectCatgory() {
      this.categoryId = "";
    },

    async refresh() {
      try {
        await this.fetchCategories();
      } catch (error) {
        console.log(error);
      }
    },

    search: _debounce(async function (value) {
      try {
        if (value.length > 0) {
          await this.searchCategory(value);
        } else {
          await this.fetchCategories();
        }
      } catch (error) {
        console.log(error);
      }
    }, 250),
  },

  components: {
    ViewContainer,
    CategoriesList,
    CategoryForm,
    Search
  },
};
</script>