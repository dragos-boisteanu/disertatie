<template>
  <ViewContainer>
    <template slot="header"> Ingredients </template>

    <div class="w-full md:flex md:gap-x-4 xl:w-3/4 2xl:w-1/2">
      <IngredientsListComponent
        @selected="selectIngredient"
      ></IngredientsListComponent>
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

export default {
  data() {
    return {
      ingredientId: "",
    };
  },

  methods: {
    reset() {
      this.ingredientId = "";
    },

    selectIngredient(ingredientId) {
        this.ingredientId = ingredientId
    },

    async submit() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        try {
          if (this.ingredientSelected) {
          } else {
            await this.postIngredient(this.ingredient);
            this.resetForm();
          }

          this.waiting = false;
        } catch (error) {
          this.waiting = false;
          console.log(error);

          if (error.response && error.response.data.errors) {
            this.$v.$touch();
          }
        }
      }
    },
  },

  components: {
    ViewContainer,
    IngredientsListComponent,
    IngredientFormComponent,
  },
};
</script>