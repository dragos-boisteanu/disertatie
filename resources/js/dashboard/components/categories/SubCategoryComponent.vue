<template>
  <li class="relative flex items-center group">
    <div
      class="
        absolute
        left-0
        top-0
        z-[1]
        flex flex-col
        items-center
        justify-center
        gap-1
        h-full
      "
    >
      <div class="flex items-center" v-if="canUp">
        <button @click.capture="updatePosition(1)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6 1.41 1.41z"
            />
          </svg>
        </button>
      </div>
      <div class="flex items-center" v-if="canDown">
        <button @click.capture="updatePosition(0)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
          </svg>
        </button>
      </div>
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
    index: {
      type: Number,
      required: true,
    },
    lastPosition: {
      type: Number,
      required: true,
    },
  },

  computed: {
    ...mapGetters("Discounts", ["getDiscounts"]),
    ...mapGetters("Categories", ["getSelectedCategory"]),

    canUp() {
      return this.subcategory.position > 1;
    },

    canDown() {
      return this.subcategory.position < this.lastPosition;
    },

    isOdd() {
      if (this.index % 2 !== 0) {
        return true;
      }

      return false;
    },

    isSelected() {
      if (this.getSelectedCategory) {
        return this.subcategory.id === parseInt(this.getSelectedCategory.id);
      }

      return false;
    },

    isDisabled() {
      return (
        this.subcategory.deletedAt !== null &&
        this.subcategory.deletedAt !== undefined
      );
    },

    getDiscount() {
      const discount = this.getDiscounts.find(
        (discount) => discount.id === parseInt(this.subcategory.discountId)
      );
      if (discount) {
        return `${discount.code} ${discount.id}%`;
      } else {
        return null;
      }
    },
  },

  methods: {
    ...mapActions("Categories", [
      "updateSubCategoryPosition",
      "setSelectedCategory",
    ]),

    selectCategory(subcategory) {
      this.setSelectedCategory(subcategory);
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
          vm: this,
        };

        // payload = {
        //     id: 23,
        //     direction: 1/0, 1 -up, 0 - down
        //    vm: this
        // }
        const response = await this.updateSubCategoryPosition(payload);

        this.$Progress.finish();
        this.$toast.success(response.data.message);
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