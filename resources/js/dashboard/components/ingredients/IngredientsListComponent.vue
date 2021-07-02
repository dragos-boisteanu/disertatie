<template>
  <div class="flex flex-col bg-white shadow rounded-sm p-5 md:flex-1">
    <div style="min-width: 450px">
      <div
        class="bg-gray-700 text-orange-500 text-left text-sm grid grid-cols-3"
      >
        <div class="p-2 text-center">Index</div>
        <div class="p-2">Name</div>
        <div class="p-2 self-center justify-self-center">Unit</div>
      </div>
      <ul class="w-full px-2 rounded-sm">
        <li
          class="
            min-w-min
            my-1
            w-full
            text-sm
            rounded-md
            cursor-pointer
            border-white
            hover:bg-gray-100
            hover:shadow-md
            grid grid-cols-3
          "
           :class="{
              'bg-gray-100 shadow-md font-semibold': ingredient.id == selectedId,
              'bg-gray-50': isEven(index),
            }"
          @click="selectIngredient(ingredient.id)"
          v-for="(ingredient, index) in getIngredients"
          :key="ingredient.id"
        >
          <div class="p-2 text-center font-semibold">{{ index + 1 }}</div>
          <div class="p-2">{{ ingredient.name }}</div>
          <div class="p-2 self-center justify-self-center">
            {{ ingredient.unit.name }}
          </div>
        </li>
      </ul>
    </div>

    <!-- <table class="px-2 w-full rounded-sm max-h-80 md:max-h-96">
      <thead class="w-full bg-gray-700 text-orange-500">
        <tr class="text-left text-sm">
          <th class="p-2 text-center">Index</th>
          <th class="p-2">Name</th>
          <th class="p-2">Quantity</th>
        </tr>
      </thead>
      <tbody class="overflow-y-scroll max-h-96">
        <tr
          v-for="(ingredient, index) in ingredients"
          :key="ingredient.id"
          @click="selectIngredient(ingredient.id)"
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
          "
          :class="{
            'bg-gray-50': isEven(index),
          }"
        >
          <td class="p-2 text-center font-semibold">{{ index + 1 }}</td>
          <td class="p-2">{{ ingredient.name }}</td>
          <td class="p-2">
            {{ ingredient.stockQuantity }} {{ ingredient.unit.name }}
          </td>
        </tr>
      </tbody>
    </table> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    selectedId: {
      type: [Number, String],
      required: false,
      default: "",
    },
  },

  computed: {
    ...mapGetters("Ingredients", ["getIngredients"]),
  },

  methods: {
    selectIngredient(ingredientId) {
      this.$emit("selected", ingredientId);
    },

    isEven(index) {
      if (index % 2 === 0) {
        return true;
      }

      return false;
    },
  },
  // 'bg-gray-100 shadow-md font-semibold': ingredient.id == selectedId,
};
</script>