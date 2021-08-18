<template>
  <li
    :id="category.id"
    class="w-full min-w-min my-1 relative"
    draggable
    @dragstart.capture="startDrag($event)"
    @drop.capture="onDrop($event)"
    @dragover.prevent
    @dragenter.prevent
  >
    <DisabledMarkerComponent v-if="isDisabled"></DisabledMarkerComponent>
    <div
      @click="selectCategory(category)"
      class="
        w-full
        text-sm
        rounded-md
        cursor-pointer
        border-white
        hover:bg-gray-100
        hover:shadow-md
        grid grid-cols-5
      "
      :class="{
        'bg-gray-100 shadow-md font-semibold': isSelected,
        'bg-gray-50': isEven,
      }"
    >
      <div class="p-2 text-center font-semibold">{{ index + 1 }}</div>
      <div class="p-2">{{ category.name }}</div>
      <div class="p-2 self-center justify-self-center">
        {{ category.vat }} %
      </div>
      <div class="p-2">
        <span v-if="category.discountId">{{ getDiscount }}</span>
      </div>
      <div class="p-2 self-center justify-self-center">
        {{ category.productsCount }}
      </div>
    </div>

    <ul class="mb-2 pb-2 border-b border-gray" v-if="showSubcategories">
      <SubCategoryComponent
        v-for="(subcategory, index) in getSubCategories"
        :key="index"
        :subcategory="subcategory"
        :index="index"
        :last-position="lastPosition"
      ></SubCategoryComponent>
    </ul>
  </li>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
import _find from "lodash/find";

import SubCategoryComponent from "./SubCategoryComponent.vue";
import DisabledMarkerComponent from "../DisabledMarkerComponent.vue";

export default {
  props: {
    category: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },

  computed: {
    ...mapGetters("Discounts", ["getDiscounts"]),
    ...mapGetters("Categories", [
      "getCategories",
      "getSelectedCategory",
      "getSelectedCategoryParentId",
    ]),

    isEven() {
      if (this.index % 2 === 0) {
        return true;
      }

      return false;
    },

    lastPosition() {
      const categoryIndex = this.getCategories.findIndex(
        (category) => category.id == this.category.id
      );
      return this.getCategories[categoryIndex].subCategories[
        this.getCategories[categoryIndex].subCategories.length - 1
      ].position;
    },

    showSubcategories() {
      if (this.getSelectedCategory) {
        // console.log(this.category.id + " " + this.getSelectedCategoryParentId);
        return (
          this.category.id === parseInt(this.getSelectedCategoryParentId) &&
          this.category.subCategories.length > 0
        );
      }
      return false;
    },

    isSelected() {
      if (this.getSelectedCategory) {
        return this.category.id === parseInt(this.getSelectedCategory.id);
      }

      return false;
    },

    isDisabled() {
      return (
        this.category.deletedAt !== null &&
        this.category.deletedAt !== undefined
      );
    },

    getDiscount() {
      const discount = _find(this.getDiscounts, [
        "id",
        parseInt(this.category.discountId),
      ]);

      if (discount) {
        return `${discount.code} ${discount.id}%`;
      }

      return "";
    },

    getSubCategories() {
      return this.category.subCategories;
    },
  },

  methods: {
    ...mapActions("Categories", ["updatePosition", "setSelectedCategory"]),

    selectCategory(category) {
      this.setSelectedCategory(category);
    },

    startDrag(evt) {
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("categoryId", this.category.id);
    },

    async onDrop(evt) {
      if (evt.dataTransfer.getData("categoryId") != evt.currentTarget.id) {
        const data = {
          categoryId: evt.dataTransfer.getData("categoryId"),
          targetCategoryId: evt.currentTarget.id,
        };

        await this.changePosition(data);
      } else {
        this.$toast.info("Can't change position with itself");
      }
    },

    async changePosition(data) {
      try {
        this.$Progress.start();

        const payload = {
          categoryId: data.categoryId,
          targetCategoryId: data.targetCategoryId,
        };

        const response = await this.updatePosition(payload);

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
    SubCategoryComponent,
    DisabledMarkerComponent,
  },
};
</script>