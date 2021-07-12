<template>
  <li class="flex items-center">
    <div class="bg-black">
      <button @click.capture="updatePosition(1)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="18px"
          viewBox="0 0 24 24"
          width="18px"
          fill="#FFFFFF"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path
            d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"
          />
        </svg>
      </button>
      <button @click.capture="updatePosition(0)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="18px"
          viewBox="0 0 24 24"
          width="18px"
          fill="#FFFFFF"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path
            d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"
          />
        </svg>
      </button>
    </div>
    <div
      class="
        relative
        w-full
        min-w-min
        my-1
        text-sm
        cursor-pointer
        hover:bg-gray-100
        hover:shadow-md
        grid grid-cols-5
      "
      :class="{
        'bg-gray-100 shadow-md font-semibold': isSelected,
        'bg-gray-50': isOdd,
      }"
      @click="selectCategory(subcategory)"
    >
      <DisabledMarkerComponent v-if="isDisabled"></DisabledMarkerComponent>
      <div class="p-2 self-center justify-self-center font-semibold">
        {{ index + 1 }}
      </div>
      <div class="p-2 self-center">{{ subcategory.name }}</div>
      <div class="p-2 self-center justify-self-center">
        {{ subcategory.vat }} %
      </div>
      <div class="p-2 self-center justify-self-center">
        <span v-if="subcategory.discountId">{{ getDiscount }}</span>
      </div>
      <div class="p-2 self-center justify-self-center">
        {{ subcategory.productsCount }}
      </div>
    </div>
  </li>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import _find from "lodash/find";

import DisabledMarkerComponent from "../DisabledMarkerComponent.vue";

export default {
  props: {
    subcategory: {
      type: Object,
      required: true,
    },
    selectedParentCategoryId: {
      type: [Number, String],
      required: true,
    },
    selectedId: {
      type: [Number, String],
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },

  computed: {
    ...mapGetters("Discounts", ["getDiscounts"]),

    isOdd() {
      if (this.index % 2 !== 0) {
        return true;
      }

      return false;
    },

    isSelected() {
      return this.subcategory.id === parseInt(this.selectedId);
    },

    isDisabled() {
      return (
        this.subcategory.deletedAt !== null &&
        this.subcategory.deletedAt !== undefined
      );
    },

    getDiscount() {
      const discount = _find(this.getDiscounts, [
        "id",
        parseInt(this.subcategory.discountId),
      ]);
      return `${discount.code} ${discount.id}%`;
    },
  },

  methods: {
    ...mapActions("Categories", ["updateSubCategoryPosition"]),

    selectCategory(subcategory) {
      this.$emit("selected", subcategory);
    },

    // 1 up
    // 0 down
    async updatePosition(direction) {
      try {
        this.$Progress.start();

        const payload = {
          id: this.subcategory.id,
          parentId: this.subcategory.parentId,
          direction,
        };

        // payload = {
        //     id: 23,
        //     direction: 1/0, 1 -up, 0 - down
        // }
        const response = await this.updateSubCategoryPosition(payload);

        this.$Progress.finish();
        this.$toast.success(response);
      } catch (error) {
        console.log(error);

        this.$Progress.fail();

        if (error.response) {
          this.$toast.error(error.response.data.error);
        }
      }
    },
  },

  components: {
    DisabledMarkerComponent,
  },
};
</script>