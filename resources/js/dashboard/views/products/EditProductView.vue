<template>
  <ViewContainer>
    <template slot="header"> Edit product #{{ localProduct.id }} </template>

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
        <div
          class="flex flex-col gap-y-3 bg-white shadow rounded-sm p-5 lg:flex-1"
        >
          <!-- IMAGE UPLOAD -->
          <div class="flex items-center gap-x-5">
            <div class="w-32 h-32 rounded-md md:mr-4">
              <img
                v-if="hasImage"
                :src="localProduct.image"
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

            <div class="flex-1">
              <ImageUploadComponent
                :url="url"
                @setImagePath="setImagePath"
              ></ImageUploadComponent>
              <button v-if="hasImage" @click.prevent="removeImage">
                Remove image
              </button>
            </div>
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
              id="barcode"
              label="Barcode"
              :hasError="$v.localProduct.barcode.$error"
              :eclass="{ 'flex-1': true }"
            >
              <template v-slot:errors>
                <p v-if="!$v.localProduct.barcode.required">
                  The barcode field is required
                </p>
              </template>
              <Input
                v-model="localProduct.barcode"
                id="barcode"
                name="barcode"
                :class="{
                  'border-red-600': $v.localProduct.barcode.$error,
                  'border-green-600':
                    $v.localProduct.barcode.$dirty &&
                    !$v.localProduct.barcode.$error,
                }"
                @input.native="$v.localProduct.barcode.$touch()"
              />
            </InputGroup>
            <InputGroup
              id="name"
              label="Label"
              :hasError="$v.localProduct.name.$error"
              :eclass="{ 'flex-1': true }"
            >
              <template v-slot:errors>
                <p v-if="!$v.localProduct.name.required">
                  The name field is required
                </p>
                <p v-if="!$v.localProduct.name.maxLength">
                  The first name field should not be longer than 50 characters
                </p>
                <p v-if="!$v.localProduct.name.alphaSpaces">
                  The name field must contain only letters and spaces
                </p>
              </template>
              <Input
                v-model="localProduct.name"
                id="name"
                name="name"
                :class="{
                  'border-red-600': $v.localProduct.name.$error,
                  'border-green-600':
                    $v.localProduct.name.$dirty && !$v.localProduct.name.$error,
                }"
                @input.native="$v.localProduct.name.$touch()"
              />
            </InputGroup>
          </div>

          <InputGroup
            id="description"
            label="Description"
            :hasErrors="$v.localProduct.description.$error"
          >
            <template v-slot:errors>
              <p v-if="!$v.localProduct.description.required">
                The description field is required
              </p>
              <p v-if="!$v.localProduct.description.alphaNumSpaces">
                The description field must contain only letters, numbers and
                spaces
              </p>
            </template>
            <Textarea
              v-model="localProduct.description"
              id="description"
              name="description"
              :class="{
                'border-red-600': $v.localProduct.description.$error,
                'border-green-600':
                  $v.localProduct.description.$dirty &&
                  !$v.localProduct.description.$error,
              }"
              @input.native="$v.localProduct.description.$touch()"
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
              id="basePrice"
              label="Base price"
              :hasError="$v.localProduct.basePrice.$error"
              :eclass="{ 'flex-1': true }"
            >
              <template v-slot:errors>
                <p v-if="!$v.localProduct.basePrice.required">
                  The base price field is required
                </p>
                <p v-if="!$v.localProduct.basePrice.decimal">
                  The base price must be in decimal format
                </p>
                <p v-if="!$v.localProduct.basePrice.minValue">
                  The base price field must be at least 1
                </p>
              </template>
              <Input
                v-model="$v.localProduct.basePrice.$model"
                id="basePrice"
                name="base price"
                type="text"
                :class="{
                  'border-red-600': $v.localProduct.basePrice.$error,
                  'border-green-600':
                    $v.localProduct.basePrice.$dirty &&
                    !$v.localProduct.basePrice.$error,
                }"
              />
            </InputGroup>
            <InputGroup
              id="category"
              label="Category"
              :hasError="$v.localProduct.categoryId.$error"
              :eclass="{ 'flex-1': true }"
            >
              <template v-slot:error>
                <p v-if="!$v.localProduct.categoryId.required">
                  The category field is mandatory
                </p>
              </template>
              <Select
                v-model="$v.localProduct.categoryId.$model"
                id="category"
                name="category"
                :class="{
                  'border-red-600': $v.localProduct.categoryId.$error,
                  'border-green-600':
                    $v.localProduct.categoryId.$dirty &&
                    !$v.localProduct.categoryId.$error,
                }"
              >
                <option value="" disabled>Select category</option>
                <option
                  :value="category.id"
                  v-for="category in getCategories"
                  :key="category.id"
                >
                  {{ category.name }} ({{ category.vat }}% VAT)
                </option>
              </Select>
            </InputGroup>
            <InputGroup
              id="subCategory"
              label="Sub category"
              :hasError="$v.localProduct.subCategoryId.$error"
              :eclass="{ 'flex-1': true }"
            >
              <template v-slot:errors>
                <p v-if="!$v.localProduct.subCategoryId.error">
                  The category field is required
                </p>
              </template>
              <Select
                v-model="$v.localProduct.subCategoryId.$model"
                id="sub_category_id"
                name="subCategory"
                :class="{
                  'border-red-600': $v.localProduct.subCategoryId.$error,
                  'border-green-600':
                    $v.localProduct.subCategoryId.$dirty &&
                    !$v.localProduct.subCategoryId.$error,
                }"
                :disabled="waiting || hasNoSubCategories"
              >
                <option value="" disabled>Select sub category</option>
                <option
                  v-for="subCategory in subCategories"
                  :key="subCategory.id"
                  :value="subCategory.id"
                >
                  {{ subCategory.name }} ({{ subCategory.vat }}% VAT)
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
              :hasError="$v.localProduct.weight.$error"
              :eclass="{ 'flex-1': true }"
            >
              <template v-slot:errors>
                <p v-if="!$v.localProduct.weight.required">
                  The weight field is required
                </p>
                <p v-if="!$v.localProduct.weight.integer">
                  The weight field must be an integer
                </p>
              </template>
              <Input
                v-model="$v.localProduct.weight.$model"
                id="weight"
                name="weight"
                :class="{
                  'border-red-600': $v.localProduct.weight.$error,
                  'border-green-600':
                    $v.localProduct.weight.$dirty &&
                    !$v.localProduct.weight.$error,
                }"
              />
            </InputGroup>
            <InputGroup
              id="weightUnit"
              label="Weight unit"
              :eclass="{ 'flex-1': true }"
            >
              <template v-slot:errors>
                <p v-if="!$v.localProduct.unitId.required">
                  The weight unit field is required
                </p>
              </template>
              <Select
                v-model="$v.localProduct.unitId.$model"
                id="unit_id"
                name="weight units"
                :class="{
                  'border-red-600': $v.localProduct.unitId.$error,
                  'border-green-600':
                    $v.localProduct.unitId.$dirty &&
                    !$v.localProduct.unitId.$error,
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
            v-if="localProduct"
            :discount-id="localProduct.discountId"
            @remove="callRemoveDiscount"
            @add="callAddDiscount"
          ></DiscountComponent>

          <IngredientsComponent
            :ingredients="localProduct.ingredients"
            @saved="callAddIngredient"
            @removed="callRemoveIngredient"
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
import { mapGetters, mapActions } from "vuex";

import ViewContainer from "../ViewContainer";

import ImageUploadComponent from "../../components/ImageUploadComponent";
import IngredientsComponent from "../../components/products/IngredientsComponent";
import DiscountComponent from "../../components/discounts/DiscountComponent";

import Input from "../../components/inputs/TextInputComponent";
import Select from "../../components/inputs/SelectInputComponent";
import Textarea from "../../components/inputs/TextareaInputComponent";
import InputGroup from "../../components/inputs/InputGroupComponent";

import Button from "../../components/buttons/ButtonComponent";

import _find from "lodash/find";
import _filter from "lodash/filter";
import _findIndex from "lodash/findIndex";
import _isEqual from "lodash/isEqual";

import {
  required,
  integer,
  decimal,
  maxLength,
  minValue,
} from "vuelidate/lib/validators";
import { alphaSpaces, alphaNumSpaces } from "../../validators/index";
import {
  patchProduct,
  addDiscount,
  removeDiscount,
  addIngredient,
  removeIngredient,
  downloadEdidProductData,
  removeImage,
} from "../../api/products.api";

export default {
  async beforeRouteEnter(to, from, next) {
    try {
      const response = await downloadEdidProductData(to.params.id);
      next((vm) => vm.setData(response.data.data));
    } catch (error) {
      console.log(error);
    }
  },

  computed: {
    ...mapGetters("Categories", ["getCategories"]),
    ...mapGetters("Units", ["getUnits"]),
    ...mapGetters("Ingredients", ["getIngredients"]),

    hasNoSubCategories() {
      return this.subCategories && this.subCategories.length === 0;
    },

    url() {
      return `/api/dashboard/products/${this.localProduct.id}/image`;
    },

    hasImage() {
      return (
        this.localProduct.image !== null &&
        this.localProduct.image !== "" &&
        this.localProduct.image !== "clear"
      );
    },
  },

  data() {
    return {
      waiting: false,

      ingredientInput: "",
      foundIngredients: [],

      subCategories: null,

      product: null,

      localProduct: {
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
      },

      waitForFileUpload: false,
      clearImage: false,
    };
  },

  validations: {
    localProduct: {
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
        minValue: minValue(1),
      },
      weight: {
        required,
        integer,
      },
      unitId: {
        required,
      },
      categoryId: {
        required,
      },
      subCategoryId: {
        integer,
      },
    },
  },

  watch: {
    "localProduct.categoryId": {
      immediate: true,
      handler(value) {
        this.subCategories = [];

        this.getCategories.forEach((category) => {
          if (category.id == value) {
            this.subCategories.push(...category.subCategories);
          }
        });

        console.log("here");
      },
    },
  },

  methods: {
    ...mapActions("Notification", ["openNotification"]),

    async submit() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        try {
          const payload = {
            product: {
              id: this.localProduct.id,
            },
          };

          let counter = 0;

          Object.keys(this.localProduct).forEach((key) => {
            if (!_isEqual(this.product[key], this.localProduct[key])) {
              payload.product[key] = this.localProduct[key];
              counter++;
            }
          });

          delete payload.ingredients;
          delete payload.discountId;

          if (payload.subCategoryId === "") {
            delete payload.subCategoryId;
          }

          if (counter > 0) {
            console.log("here");
            const response = await patchProduct(payload.product);

            counter = 0;

            this.$router.push({
              name: "Product",
              params: { id: this.product.id },
            });

            this.$toast.success(response.data.message);
          } else {
            this.$v.$reset();
            this.$toast.info("Nothing to update");
          }
        } catch (error) {
          if (error.response && error.response.data.errors) {
            this.$toast.error(response.data.message);

            this.$v.$touch();
          }
          console.log(error);
        }
      }
    },

    // getSubCategories() {
    //   this.localProduct.subCategoryId = "";
    //   this.subCategories = [];

    //   this.getCategories.forEach((category) => {
    //     if (category.id == this.localProduct.categoryId) {
    //       this.subCategories.push(...category.subCategories);
    //     }
    //   });
    // },

    async removeImage() {
      try {
        const payload = {
          id: this.localProduct.id,
          image: this.localProduct.imagePath,
        };

        await removeImage(payload);
      } catch (error) {
        console.log(error);
      }
    },

    setWaiting(value) {
      this.waiting = value;
    },

    setImagePath(imagePath) {
      this.localProduct.image = imagePath;
    },

    async callAddIngredient(ingredient) {
      try {
        this.$Progress.start();

        const data = {
          id: this.product.id,
          ingredientId: ingredient.id,
          quantity: ingredient.quantity,
        };

        const response = await addIngredient(data);

        const ingredientIndex = _findIndex(this.localProduct.ingredients, [
          "id",
          parseInt(ingredient.id),
        ]);

        if (ingredientIndex > -1) {
          Object.keys(ingredient).forEach((key) => {
            this.$set(
              this.localProduct.ingredients[ingredientIndex],
              key,
              ingredient[key]
            );
          });
        } else {
          this.localProduct.ingredients.push(ingredient);
        }

        this.$Progress.finish();
        this.$toast.success(response.data.message);
      } catch (error) {
        this.$Progress.fail();

        if (error.response) {
          this.$toast.error(response.data.message);
        } else {
          this.$toast.error("Something went wrong");
        }
      }
    },

    async callRemoveIngredient(ingredientId) {
      try {
        this.$Progress.start();

        const data = {
          id: this.product.id,
          ingredientId,
        };

        const response = await removeIngredient(data);

        const ingredientIndex = _findIndex(this.localProduct.ingredients, [
          "id",
          parseInt(ingredientId),
        ]);

        this.localProduct.ingredients.splice(ingredientIndex, 1);

        this.$Progress.finish();
        this.$toast.success(response.data.message);
      } catch (error) {
        console.log(error);
        this.$Progress.fail();

        if (error.response) {
          this.$toast.error(error.response.data.message);
        } else {
          this.$toast.error("Something went wrong!");
        }
      }
    },

    async callAddDiscount(discountId) {
      try {
        this.$Progress.start();

        const data = {
          id: this.product.id,
          discountId,
        };

        const response = await addDiscount(data);

        this.localProduct.discountId = discountId;

        this.$Progress.finish();

        this.$toast.success(response.data.message);
      } catch (error) {
        if (error.response && error.response.data) {
          this.$toast.error(error.response.data.message);
        } else {
          this.$toast.error("Something went wrong");
        }
        this.$Progress.fail();
      }
    },

    async callRemoveDiscount() {
      try {
        this.$Progress.start();

        const response = await removeDiscount(this.product.id);

        this.localProduct.discountId = "";

        this.$Progress.finish();
        this.$toast.success(response.data.message);
      } catch (error) {
        if (error.response && error.response.data) {
          this.$toast.error(response.data.message);
        }
        this.$Progress.fail();
      }
    },

    setData(data) {
      this.product = data;
      this.localProduct = JSON.parse(JSON.stringify(data));
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