<template>
  <div class="flex flex-col bg-white shadow rounded-sm p-5 md:flex-1">
    <table class="px-2 w-full rounded-sm max-h-80 md:max-h-96">
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
            transition-shadow
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
          <td class="p-2">{{ ingredient.name }}</td>
          <td class="p-2">
            {{ ingredient.stockQuantity }} {{ ingredient.unit.name }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    ingredients: {
      type: Array,
      required: true,
    },
  },

  methods: {
    selectIngredient(ingredientId) {
      this.$emit("selected", ingredientId);
    },
  },
};
</script>