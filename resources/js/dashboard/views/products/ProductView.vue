<template>
  <ViewContainer v-if="product">
    <template slot="header">
      <div class="flex items-center justify-between md:justify-start gap-x-4">
        <span> Product #{{ product.id }} </span>
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
      class="
        w-full
        pb-2
        mb-2
        flex flex-col
        justify-center
        items-center
        border-b border-gray-100
        md:flex-row
        md:justify-start
      "
    >
      <div class="w-32 h-32 rounded-md md:mr-4">
        <img
          v-if="product.image"
          :src="product.image"
          class="w-full h-full rounded-md object-cover"
        />
        <svg
          v-else
          class="bg-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          width="128px"
          height="128px"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            d="M12 2C8.43 2 5.23 3.54 3.01 6L12 22l8.99-16C18.78 3.55 15.57 2 12 2zM7 7c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm5 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
          />
        </svg>
      </div>
      <div class="flex flex-col items-center justify-center md:items-start">
        <div class="flex gap-x-2 items-center font-semibold text-2xl mt-2">
          <h1 class="pr-2 border-r border-gray-200">{{ product.name }}</h1>
          <span class="text-base">{{ product.weight }} {{ product.unit }}</span>
        </div>
        <div class="text-sm">
          {{ product.basePrice }} RON /
          <span> {{ product.vat }} % VAT</span>
          <span v-if="hasDiscount"> / {{ product.discount }} % discount</span>
        </div>
        <div class="flex justify-center w-full mt-2 md:justify-start">
          <Status :deleted-at="product.deletedAt" />
          <Category :category-id="product.categoryId" :sub-category-id="product.subCategoryId"></Category>
          <Stock :quantity="product.quantity"></Stock>
        </div>
        <div class="flex items-center gap-x-2">
          <button
            @click="editProduct"
            class="
              bg-amber-700
              rounded-sm
              text-xs
              py-1
              px-4
              text-white
              mt-2
              hover:bg-amber-600
              active:bg-amber-400
              active:shadow-inner
              active:outline-none
            "
          >
            Edit
          </button>
          <div v-if="canDisable">
            <button
              v-if="canRestore"
              @click="restore"
              class="
                bg-white
                border border-green-500
                rounded-sm
                text-xs
                py-1
                px-4
                text-black
                hover:border-green-400
                mt-2
                active:shadow-inner
                active:outline-none
              "
            >
              Restore
            </button>
            <button
              v-else
              @click="disable"
              class="
                bg-white
                border border-red-500
                rounded-sm
                text-xs
                py-1
                px-4
                text-black
                mt-2
                hover:border-red-400
                active:shadow-inner
                active:outline-none
              "
            >
              Disable
            </button>
          </div>
        </div>
        <router-link
          :to="{
            name: 'ProuductsStock',
            params: { barcode: this.product.barcode },
          }"
          class="
            bg-sky-700
            rounded-sm
            text-xs
            py-1
            px-4
            text-white
            mt-2
            hover:bg-sky-600
            active:bg-sky-400
            active:shadow-inner
            active:outline-none
          "
        >
          Update stock
        </router-link>
      </div>
    </div>
    <div v-if="hasDiscount" class="text-sm mb-2 pb-2 border-b border-gray-100">
      <h2 class="font-bold text-lg my-2">Discount</h2>
      <div>
        <div>
          <span class="font-semibold">Code:</span> {{ product.discount.code }}
        </div>
        <div>
          <span class="font-semibold">Value:</span>
          {{ product.discount.value }}%
        </div>
        <div>
          <span class="font-semibold">Starts at:</span>
          {{ product.discount.startsAt }}
        </div>
        <div>
          <span class="font-semibold">Ends at:</span>
          {{ product.discount.endsAt }}
        </div>
      </div>
    </div>
    <div class="text-sm mb-2 pb-2 border-b border-gray-100">
      <h2 class="font-bold text-lg my-2">Descriere</h2>
      {{ product.description }}
    </div>
    <div v-if="product.hasIngredients">
      <h2 class="font-bold text-lg my-2">Ingredients</h2>
      <ul>
        <li
          v-for="ingredient in product.ingredients"
          :key="ingredient.id"
          class="flex items-center gap-x-2"
        >
          <div class="font-semibold text-sm">
            {{ ingredient.name }}
          </div>
          <div class="text-xs">
            {{ ingredient.quantity }} {{ ingredient.unit.name }}
          </div>
        </li>
      </ul>
    </div>
  </ViewContainer>
</template>


<script>
import ViewContainer from "../ViewContainer";
import Status from "../../components/StatusComponent";
import Stock from "../../components/StockComponent";
import Category from "../../components/products/CategoryComponent";;

import { mapGetters } from "vuex";

import {
  downloadProduct,
  disableProduct,
  restoreProduct,
} from "../../api/products.api";

export default {
  async beforeRouteEnter(to, from, next) {
    const response = await downloadProduct(to.params.id);
    next((vm) => vm.setProduct(response.data.data));
  },

  computed: {
    ...mapGetters("Users", ["getLoggedUser"]),

    canDelete() {
      if (this.getLoggedUser) {
        return this.getLoggedUser.role.name === "Administrator";
      }
    },

    canDisable() {
      if (this.getLoggedUser) {
        return (
          this.getLoggedUser.role.name === "Location Manager" ||
          this.getLoggedUser.role.name === "Administrator"
        );
      }
    },

    canRestore() {
      return this.product.deletedAt !== "" && this.product.deletedAt !== null
    },

    hasDiscount() {
      return this.product.discount ? true : false;
    },
  },

  data() {
    return {
      product: null,
    };
  },

  methods: {
    updateProduct(product) {
      Object.keys(product).forEach((key) => {
        this.product[key] = product[key];
      });
    },

    setProduct(product) {
      this.product = product;
    },

    editProduct() {
      this.$router.push({
        name: "EditProduct",
        params: { id: this.product.id },
      });
    },

    async disable() {
      const response = await disableProduct(this.product.id);
      this.product.deletedAt = response.data.deleted_at;
    },

    async restore() {
      const response = await restoreProduct(this.product.id);
      this.product.deletedAt = response.data.deleted_at;
    },

    async refresh() {
        const response = await downloadProduct(this.product.id);
        this.setProduct(response.data.data); 
    }
  },

  components: {
    ViewContainer,
    Stock,
    Status,
    Category,
  },
};
</script>