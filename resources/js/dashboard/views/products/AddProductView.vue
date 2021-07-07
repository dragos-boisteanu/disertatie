<template>
  <ViewContainer>
    <template slot="header"> Add new product </template>

    <form @submit.prevent="submit" class="flex flex-col">
      <div
        class="
          flex flex-col
          lg:flex-row
          lg:items-start
          lg:gap-x-6
          xl:w-9/12
          2xl:w-2/4
        "
      >
        <div class="flex flex-col gap-y-3 bg-white shadow rounded-sm p-5 lg:flex-1">
          <!-- IMAGE UPLOAD -->
          <ImageUploadComponent
            :clear="clearImage"
            @fileAdded="setWaiting"
            @processFileAborted="setWaiting"
            @fileProcessed="setWaiting"
            @setImagePath="setImagePath"
          ></ImageUploadComponent>

          <div
            class="
              flex flex-col
              gap-y-4
              md:flex md:flex-row
              md:items-center
              md:justify-between
              md:gap-x-4
            "
          >
            <InputGroup
              id="barcode"
              label="Barcode"
              :hasError="$v.product.barcode.$error"
              :eclass="{ 'flex-1': true }"
            >
              <template v-slot:errors>
                <p v-if="!$v.product.barcode.required">
                  The barcode field is required
                </p>
              </template>
              <div class="flex gap-x-3 items-center relative flex-1">
                <Input
                  v-model="$v.product.barcode.$model"
                  id="barcode"
                  name="barcode"
                  :class="{
                    'border-red-600': $v.product.barcode.$error,
                    'border-green-600':
                      $v.product.barcode.$dirty && !$v.product.barcode.$error,
                  }"
                />
                <svg
                  v-show="checkingBarcode"
                  class="animate-spin mr-3 h-5 w-5 text-sky-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            </InputGroup>

            <InputGroup
              id="name"
              label="Name"
              :hasError="$v.product.name.$error"
              :eclass="{ 'flex-1': true }"
            >
              <template v-slot:errors>
                <p v-if="!$v.product.name.required">
                  The name field is required
                </p>
                <p v-if="!$v.product.name.maxLength">
                  The namme field must be shorter than 50 characters
                </p>
                <p v-if="!$v.product.name.alphaSpaces">
                  The name field must contain only letters and spaces
                </p>
              </template>
              <Input
                v-model="$v.product.name.$model"
                id="firstName"
                name="first name"
                :class="{
                  'border-red-600': $v.product.name.$error,
                  'border-green-600':
                    $v.product.name.$dirty && !$v.product.name.$error,
                }"
              />
            </InputGroup>
          </div>

          <InputGroup
            id="name"
            label="Description"
            :hasError="$v.product.description.$error"
          >
            <template v-slot:errors>
              <p v-if="!$v.product.description.required">
                The description field is required
              </p>
              <p v-if="!$v.product.description.maxLength">
                The description field must be shorter than 255 characters
              </p>
              <p v-if="!$v.product.description.alphaNumSpaces">
                The description field must contain only letters, numbers and
                spaces
              </p>
            </template>
            <Textarea
              v-model="$v.product.description.$model"
              id="description"
              name="description"
              :eclass="{
                'border-red-600': $v.product.description.$error,
                'border-green-600':
                  $v.product.description.$dirty &&
                  !$v.product.description.$error,
              }"
            />
          </InputGroup>

          <div
            class="
              flex flex-col
              gap-y-4
              md:flex md:flex-row
              md:items-center
              md:justify-between
              md:gap-x-4
            "
          >
            <InputGroup
              id="name"
              label="Base price"
              :hasError="$v.product.basePrice.$error"
              :eclass="{ 'flex-1': true }"
            >
              <template v-slot:errors>
                <p v-if="!$v.product.basePrice.required">
                  The base price field is required
                </p>
              </template>
              <Input
                v-model="$v.product.basePrice.$model"
                id="basePrice"
                name="base price"
                :class="{
                  'border-red-600': $v.product.basePrice.$error,
                  'border-green-600':
                    $v.product.basePrice.$dirty && !$v.product.basePrice.$error,
                }"
              />
            </InputGroup>
            <InputGroup
              id="category"
              label="Category"
              :hasError="$v.product.categoryId.$error"
              :eclass="{ 'flex-1': true }"
            >
              <template v-slot:errors>
                <p v-if="!$v.product.categoryId.error">
                  The category field is required
                </p>
              </template>
              <Select
                v-model="$v.product.categoryId.$model"
                id="unitId"
                name="category"
                :class="{
                  'border-red-600': $v.product.categoryId.$error,
                  'border-green-600':
                    $v.product.categoryId.$dirty &&
                    !$v.product.categoryId.$error,
                }"
                @change.native="getSubCategories"
              >
                <option value="" disabled>Select category</option>
                <option
                  :value="category.id"
                  v-for="category in categories"
                  :key="category.id"
                >
                  {{ category.name }} ({{ category.vat }}% VAT)
                </option>
              </Select>
            </InputGroup>
            <InputGroup
              id="category"
              label="Sub category"
              :hasError="$v.product.subCategoryId.$error"
              :eclass="{ 'flex-1': true }"
            >
              <template v-slot:errors>
                <p v-if="!$v.product.subCategoryId.error">
                  The category field is required
                </p>
              </template>
              <Select
                v-model="$v.product.subCategoryId.$model"
                id="unitId"
                name="category"
                :class="{
                  'border-red-600': $v.product.subCategoryId.$error,
                  'border-green-600':
                    $v.product.subCategoryId.$dirty &&
                    !$v.product.subCategoryId.$error,
                }"
                :disabled="hasNoSubCategories"
              >
                <option value="" disabled selected>Select sub category</option>
                <option
                  :value="category.id"
                  v-for="category in subCategories"
                  :key="category.id"
                >
                  {{ category.name }} ({{ category.vat }}% VAT)
                </option>
              </Select>
            </InputGroup>
          </div>

          <div
            class="
              flex flex-col
              gap-y-4
              md:flex md:flex-row
              md:items-center
              md:justify-between
              md:gap-x-4
            "
          >
            <InputGroup
              id="weight"
              label="Weight"
              :hasError="$v.product.weight.$error"
              :eclass="{ 'flex-1': true }"
            >
              <template v-slot:errors>
                <p v-if="!$v.product.weight.required">
                  The weight field is required
                </p>
              </template>
              <Input
                v-model="$v.product.weight.$model"
                id="weight"
                name="weight"
                :eclass="{
                  'border-red-600': $v.product.weight.$error,
                  'border-green-600':
                    $v.product.weight.$dirty && !$v.product.weight.$error,
                }"
              />
            </InputGroup>
            <InputGroup
              id="unitId"
              label="Weight units"
              :hasError="$v.product.unitId.$error"
              :eclass="{ 'flex-1': true }"
            >
              <template v-slot:errors>
                <p v-if="!$v.product.unitId.required">
                  The weight unit field is required
                </p>
              </template>
              <Select
                v-model="$v.product.unitId.$model"
                id="unitId"
                name="unitId"
                :eclass="{
                  'border-red-600': $v.product.unitId.$error,
                  'border-green-600':
                    $v.product.unitId.$dirty && !$v.product.unitId.$error,
                }"
              >
                <option value="" disabled>Select unit</option>
                <option
                  :value="unit.id"
                  v-for="unit in getUnits"
                  :key="unit.id"
                >
                  {{ unit.name }} ({{ unit.description }})
                </option>
              </Select>
            </InputGroup>
          </div>

          <DiscountComponent
            v-if="product"
            :discount-id="product.discountId"
            @remove="removeDiscount"
            @add="addDiscount"
          ></DiscountComponent>

          <!-- INGREDIENTS -->
          <IngredientsComponent
            :ingredients="product.ingredients"
            @saved="saveIngredient"
            @removed="removeIngredient"
          ></IngredientsComponent>
        </div>
      </div>

      <div class="mt-5 flex md:justify-start">
        <Button
          type="primary"
          :disabled="waiting"
          @click.native.prevent="submit"
        >
          Submit
        </Button>
      </div>
    </form>
  </ViewContainer>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import ViewContainer from "../ViewContainer";

import ImageUploadComponent from "../../components/ImageUploadComponent";
import IngredientsComponent from "../../components/products/IngredientsComponent";

import DiscountComponent from "../../components/discounts/DiscountComponent.vue";

import Input from "../../components/inputs/TextInputComponent";
import Select from "../../components/inputs/SelectInputComponent";
import Textarea from "../../components/inputs/TextareaInputComponent";
import InputGroup from "../../components/inputs/InputGroupComponent";

import Button from "../../components/buttons/ButtonComponent";

import _debounce from "lodash/debounce";
import _find from "lodash/find";
import _filter from "lodash/filter";
import _findIndex from "lodash/findIndex";
import _isEmpty from "lodash/isEmpty";

import {
  required,
  integer,
  decimal,
  maxLength,
} from "vuelidate/lib/validators";
import { alphaSpaces, alphaNumSpaces } from "../../validators/index";

import { storeProduct } from "../../api/products.api";

export default {
  computed: {
    ...mapGetters("Categories", ["getCategories"]),
    ...mapGetters("Units", ["getUnits"]),
    ...mapGetters("Ingredients", ["getIngredients"]),
    ...mapGetters("Discounts", ["getDiscounts"]),

    categories() {
      return this.getCategories.filter(
        (category) => category.parentId === null
      );
    },

    availableDiscounts() {
      return this.getDiscounts.filter(
        (discount) => discount.deletedAt === null
      );
    },

    isDiscountSelected() {
      return this.selectedDiscount ? true : false;
    },

    hasNoSubCategories() {
      return this.subCategories.length === 0;
    },
  },

  data() {
    return {
      checkingBarcode: false,
      waiting: false,

      ingredientInput: "",
      foundIngredients: [],

      subCategories: [],

      clearImage: false,

      product: {
        barcode: "",
        name: "",
        description: "",
        basePrice: "",
        weight: "",
        unitId: "",
        categoryId: "",
        subCategoryId: "",
        ingredients: [],
        hasIngredients: false,
        discountId: "",
      },
    };
  },

  validations: {
    product: {
      barcode: {
        required,
      },
      name: {
        required,
        maxLength: maxLength(50),
        alphaSpaces,
      },
      description: {
        required,
        maxLength: maxLength(255),
        alphaNumSpaces,
      },
      basePrice: {
        required,
        decimal,
      },
      weight: {
        required,
      },
      unitId: {
        required,
        integer,
      },
      categoryId: {
        required,
      },
      subCategoryId: {
        integer,
      },
    },
  },

  methods: {
    ...mapActions("Products", ["addProduct", "getProductByBarcode"]),

    async submit() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        try {
          this.waiting = true;

          const payload = {};

          Object.keys(this.product).forEach((key) => {
            payload[key] = this.product[key];
          });

          if (payload.discountId === "") {
            delete payload.discountId;
          }

          if (payload.ingredients.length === 0) {
            delete payload.ingredients;
          }

          if (payload.subCategoryId === "") {
            delete payload.subCategoryId;
          }

          const response = await storeProduct(payload);

          this.product = {
            barcode: "",
            name: "",
            description: "",
            basePrice: "",
            weight: "",
            unitId: "",
            quantity: "",
            categoryId: "",
            subCategoryId: "",
            discountId: "",
            ingredients: [],
          }
            
          this.waiting = false;

          this.clearImage = true;

          this.$toast.success(response.data.message);

          this.$v.$reset();
        } catch (error) {
          console.log(error);

          this.waiting = false;

          if (error.response && error.response.data.errors) {
            this.$toast.error(response.data.message);
            this.$v.$touch();
          }
        }
      }
    },

    getSubCategories() {
      this.subCategories = [];
      this.product.subCategoryId = "";

      if (this.product.categoryId) {
        this.getCategories.forEach(category => {
          if(category.id == this.product.categoryId) {
            this.subCategories.push(...category.subCategories);
          }
        })

      } else {
        this.subCategories = [];
      }
    },

    setWaiting(value) {
      this.waiting = value;
    },

    setImagePath(imagePath) {
      this.product.image = imagePath;
    },

    saveIngredient(ingredient) {
      const ingredientIndex = _findIndex(this.product.ingredients, [
        "id",
        parseInt(ingredient.id),
      ]);

      if (ingredientIndex > -1) {
        Object.keys(ingredient).forEach((key) => {
          this.$set(
            this.product.ingredients[ingredientIndex],
            key,
            ingredient[key]
          );
        });
      } else {
        this.product.ingredients.push(ingredient);
      }
    },

    removeIngredient(ingredientId) {
      const ingredientIndex = _findIndex(this.product.ingredients, [
        "id",
        parseInt(ingredientId),
      ]);
      this.product.ingredients.splice(ingredientIndex, 1);
    },

    removeDiscount() {
      this.product.discountId = "";
    },

    addDiscount(discountId) {
      this.product.discountId = discountId;
    },
  },

  components: {
    ViewContainer,
    ImageUploadComponent,
    IngredientsComponent,
    DiscountComponent,
    Input,
    Select,
    Textarea,
    InputGroup,
    Button,
  },
};
</script>