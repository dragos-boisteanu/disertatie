<template>
  <div class="">
    <form
      @submit.prevent="submit"
      class="
        flex flex-col
        items-stretch
        justify-items-start
        gap-y-3
        md:flex-auto
      "
    >
      <div class="flex flex-col gap-y-3 bg-white shadow rounded-sm p-5">
        <h2 class="mb-4 text-xl font-semibold">Category</h2>
        <InputGroup id="name" label="Name" :hasError="$v.category.name.$error">
          <template v-slot:errors>
            <p v-if="!$v.category.name.required">The vat field is required</p>
            <p v-if="!$v.category.name.maxLength">
              The vat field must be no longer than 50 characters
            </p>
            <p v-if="!$v.category.name.alphaSpaces">
              The vat field must contain only letters or spaces
            </p>
          </template>
          <Input
            v-model="category.name"
            id="name"
            name="name"
            :eclass="{
              'border-red-600': $v.category.name.$error,
              'border-green-600':
                $v.category.name.$dirty && !$v.category.name.$error,
            }"
            :disabled="waiting"
            @blur.native="$v.category.name.$touch()"
          ></Input>
        </InputGroup>

        <div class="w-full flex items-center gap-x-4">
          <InputGroup
            v-if="isParent"
            id="vat"
            label="VAT"
            :hasError="$v.category.vat.$error"
          >
            <template v-slot:errors>
              <p v-if="!$v.category.vat.required">The vat field is required</p>
              <p v-if="!$v.category.vat.integer">
                The vat field must be an integer
              </p>
              <p v-if="!$v.category.vat.minValue">
                The vat field must be equal or greater than 0
              </p>
            </template>
            <Input
              v-model="category.vat"
              id="vat"
              name="vat"
              :eclass="{
                'border-red-600': $v.category.vat.$error,
                'border-green-600':
                  $v.category.vat.$dirty && !$v.category.vat.$error,
              }"
              :disabled="waiting"
              @blur.native="$v.category.vat.$touch()"
            ></Input>
          </InputGroup>
          <InputGroup
            id="color"
            label="Color"
            :hasError="$v.category.color.$error"
          >
            <template slot="errors">
              <p v-if="!$v.category.color.required">
                The color field is required
              </p>
            </template>
            <input
              id="color"
              name="color"
              type="color"
              @change="$v.category.color.$touch()"
              v-model="category.color"
              class="p-1 rounded border order-gray-300 outline-none"
              :class="{
                'border-red-600': $v.category.color.$error,
                'border-green-600':
                  $v.category.color.$dirty && !$v.category.color.$error,
              }"
              :disabled="waiting"
            />
          </InputGroup>
        </div>

        <InputGroup id="parentCategory" label="Parent category">
          <Select
            id="parentCategory"
            name="Parent category"
            type="color"
            v-model="category.parentId"
            class="p-1 rounded border order-gray-300 outline-none"
            :disabled="waiting"
          >
            <option value="" disabled selected>Select parent category</option>
            <option
              v-for="parent in parentCategories"
              :key="parent.id"
              :value="parent.id"
            >
              {{ parent.name }}
            </option>
          </Select>
        </InputGroup>

        <div class="w-full">
          <DiscountComponent
            :discount-id="category.discountId"
            @remove="removeDiscount"
            @add="addDiscount"
          ></DiscountComponent>
        </div>
      </div>

      <div>
        <div>
          <Button type="secondary" @click.native.prevent="resetForm">
            Reset
          </Button>
        </div>
        <div class="mt-4 flex items-center gap-4">
          <div v-if="isCategorySelected" class="flex gap-x-4">
            <Button
              type="primary"
              :waiting="waiting"
              @click.native.prevent="patch"
            >
              Update
            </Button>
            <Button
              v-if="canDelete"
              type="danger"
              :waiting="waiting"
              @click.native.prevent="remove"
            >
              Delete
            </Button>
          </div>
          <Button
            v-else
            type="primary"
            :waiting="waiting"
            @click.native.prevent="create"
          >
            Create
          </Button>
        </div>
      </div>
    </form>
  </div>
</template>


<script>
import Input from "../../components/inputs/TextInputComponent";
import Select from "../../components/inputs/SelectInputComponent";
import Button from "../../components/buttons/ButtonComponent";
import InputGroup from "../../components/inputs/InputGroupComponent";
import DiscountComponent from "../../components/discounts/DiscountComponent";

import { mapActions, mapGetters } from "vuex";

import _find from "lodash/find";
import { alphaSpaces } from "../../validators/index";
import {
  required,
  integer,
  maxLength,
  minValue,
  requiredIf,
} from "vuelidate/lib/validators";

export default {
  props: {
    categoryId: {
      type: [Number, String],
      required: false,
      default: "",
    },
  },

  computed: {
    ...mapGetters("Categories", ["getCategories"]),
    ...mapGetters("Discounts", ["getDiscounts"]),

    availableDiscounts() {
      return this.getDiscounts.filter(
        (discount) => discount.deletedAt === null
      );
    },

    canDelete() {
      return this.category.productsCount === 0;
    },

    parentCategories() {
      return this.getCategories.filter(
        (category) => category.parentId === null
      );
    },

    isParent() {
      return this.category.parentId === null;
    },

    isCategorySelected() {
      return this.categoryId ? true : false;
    },
  },

  data() {
    return {
      waiting: false,
      category: {
        name: "",
        vat: "",
        color: "",
        discountId: "",
        parentId: null,
      },
    };
  },

  validations: {
    category: {
      name: {
        required,
        maxLength: maxLength(50),
        alphaSpaces,
      },
      vat: {
        required: requiredIf(function () {
          return this.isParent;
        }),
        integer,
        minValue: minValue(0),
      },
      color: {
        required,
      },
    },
  },

  watch: {
    categoryId: function (value) {
      if (value) {
        this.category = JSON.parse(
          JSON.stringify(_find(this.getCategories, ["id", value]))
        );
      }
    },
  },

  methods: {
    ...mapActions("Categories", [
      "postCategory",
      "patchCategory",
      "deleteCategory",
      "updateDiscount",
    ]),
    ...mapActions("Notification", ["openNotification"]),

    async create() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        if (this.category.vat === "") {
          delete this.category.vat;
        }

        if (this.category.parentId === null) {
          delete this.category.parentId;
        }

        if (this.category.discountId === "") {
          delete this.category.discountId;
        }

        await this.postCategory(this.category);

        this.openNotification({
          type: "ok",
          show: true,
          message: "Category created",
        });

        this.resetForm();
      }
    },

    async patch() {
      try {
        this.$v.$touch();

        if (!this.$v.$invalid) {
          this.waiting = true;

          const originalCategory = JSON.parse(
            JSON.stringify(_find(this.getCategories, ["id", this.categoryId]))
          );

          const payload = {
            vm: this,
            category: {
              id: originalCategory.id,
            },
          };

          let counter = 0;

          Object.keys(this.category).forEach((key) => {
            if (originalCategory[key] !== this.category[key]) {
              payload.category[key] = this.category[key];
              counter++;
            }
          });

          if (this.category.discountId === "") {
            delete payload.category.discountId;
          }

          if (this.category.parentId === "") {
            delete payload.category.parentId;
          }

          console.log(originalCategory);

          if (counter > 0) {
            await this.patchCategory(payload);

            payload.category.discountId = this.category.discountId;
            this.updateDiscount(payload);

            this.waiting = false;

            this.openNotification({
              type: "ok",
              show: true,
              message: "Category updated",
            });
          } else {
            this.waiting = false;
            this.openNotification({
              type: "info",
              show: true,
              message: "Nothing to update",
            });
          }
        }
      } catch (error) {
        this.waiting = false;
        console.log(error);
      }
    },

    async remove() {
      try {
        await this.deleteCategory(this.categoryId);

        this.resetForm();

        this.openNotification({
          type: "ok",
          show: true,
          message: "Category removed",
        });
      } catch (error) {
        console.log(error);
      }
    },

    resetForm() {
      this.$v.$reset();

      this.category = {
        name: "",
        vat: "",
        color: "",
        discountId: "",
        parentId: null,
      };

      if (this.isCategorySelected) {
        this.$emit("resetCategory");
      }
    },

    removeDiscount() {
      this.category.discountId = "";
    },

    addDiscount(discountId) {
      this.category.discountId = discountId;
    },
  },

  components: {
    Input,
    Select,
    Button,
    InputGroup,
    DiscountComponent,
  },
};
</script>