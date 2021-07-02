<template>
  <ViewContainer>
    <template slot="header">
      <div class="flex items-center justify-between md:justify-start gap-x-4">
        <span> Ingredients </span>
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

    <div class="w-full md:flex md:gap-x-4 xl:w-3/4 2xl:w-1/2">
      <div class="md:flex-1 flex flex-col">
        <Search @search="search"></Search>
        <IngredientsListComponent
          :selected-id="ingredientId"
          @selected="selectIngredient"
        ></IngredientsListComponent>
      </div>

      <IngredientFormComponent
        :ingredient-id="ingredientId"
        @reset="reset"
      ></IngredientFormComponent>
    </div>
  </ViewContainer>
</template>

<script>
import ViewContainer from "../ViewContainer";

import IngredientsListComponent from "../../components/ingredients/IngredientsListComponent.vue";
import IngredientFormComponent from "../../components/ingredients/IngredientsFormComponent.vue";
import Search from "../../components/ingredients/IngredientsSearchComponent.vue";

import { mapActions, mapGetters } from "vuex";

export default {
  mounted() {
    this.ingredients = this.getIngredients;
  },

  computed: {
    ...mapGetters("Ingredients", ["getIngredients"]),
  },

  data() {
    return {
      ingredients: [],
      ingredientId: "",
    };
  },

  methods: {
    ...mapActions("Ingredients", ["downloadIngredients"]),

    reset() {
      this.ingredientId = "";
    },

    selectIngredient(ingredientId) {
      this.ingredientId = ingredientId;
    },

    search(value) {
      if (value) {
        this.ingredients = this.getIngredients.filter((ingredient) => {
          const regexRule = `${value.toLowerCase().trim()}*`;
          const regex = new RegExp(regexRule, "g");
          if (ingredient.name.toLowerCase().trim().match(regex)) {
            return true;
          }
        });
      } else {
        this.ingredients = this.getIngredients;
      }
    },

    async refresh() {
      await this.downloadIngredients();
      this.ingredients = this.getIngredients;
    },
  },

  components: {
    ViewContainer,
    IngredientsListComponent,
    IngredientFormComponent,
    Search,
  },
};
</script>