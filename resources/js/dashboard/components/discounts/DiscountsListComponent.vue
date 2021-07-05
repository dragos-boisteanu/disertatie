<template>
  <div class="overflow-x-auto bg-white shadow rounded-sm p-5 max-h-[400px]">
    <table class="px-2 w-full rounded-sm max-h-80 md:max-h-96">
      <thead class="w-full bg-gray-700 text-orange-500">
        <tr class="text-left text-sm">
          <th class="p-2 text-center">Index</th>
          <th class="p-2">Code</th>
          <th class="p-2">Value</th>
          <th class="p-2">Status</th>
        </tr>
      </thead>
      <tbody class="overflow-y-auto">
        <tr
          v-for="(discount, index) in discounts"
          :key="discount.id"
          @click="selectDiscount(discount.id)"
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
          <td class="p-2">{{ discount.code }}</td>
          <td class="p-2">{{ discount.value }}%</td>
          <td class="p-2 text-center">
            <span
              class="text-white rounded-sm px-2 py-1 text-xs"
              :class="{
                'bg-red-600': discount.deletedAt,
                'bg-green-600': !discount.deletedAt,
              }"
            >
              {{ status(discount) }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    discounts: {
      type: Array,
      required: true
    }
  },

  methods: {
    selectDiscount(discountId) {
      this.$emit("selected", discountId);
    },

    status(discount) {
      if (discount.deletedAt) {
        return "Disabled";
      }
      return "Active";
    },
  },
};
</script>