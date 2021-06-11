<template>
  <ViewContainer>
    <template slot="header">
      <div class="flex items-center justify-between md:justify-start gap-x-4">
        <span> Categories </span>
        <button
          @click="refresh"
          class="
            p-1
            bg-lightBlue-600
            rounded-sm
            active:shadow-inner
            active:bg-lightBlue-500
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

    <div class="w-full md:flex md:gap-x-4 xl:w-3/4 2xl:w-1/2">
      <div class="flex flex-col bg-white shadow rounded-sm p-5 md:flex-1">
        <div class="w-full mb-2 flex items-center gap-x-2">
          <div class="w-full p-2 flex items-center bg-gray-50">
            <svg
              class="text-coolGray-300 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
              />
            </svg>
            <input
              name="search"
              id="search"
              placeholder="Search category by name"
              class="w-full outline-none px-2 rounded bg-gray-50"
              v-model="searchInput"
              @input="search"
            />
          </div>
        </div>

        <table class="px-2 w-full table-auto rounded-sm max-h-80 md:max-h-96">
          <thead class="w-full bg-gray-700 text-orange-500">
            <tr class="text-left text-sm">
              <th class="p-2 text-center">Index</th>
              <th class="p-2">Color</th>
              <th class="p-2">Name</th>
              <th class="p-2">Vat</th>
              <th class="p-2">Discount</th>
              <th class="p-2">Count</th>
              <th></th>
            </tr>
          </thead>
          <tbody class="max-h-36 overflow-y-auto">
            <tr
              v-for="(category, index) in getCategories"
              :key="category.id"
              @click="selectCategory(category.id)"
              class="
                transition-shadow transition-transform
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
              <td class="p-2">
                <div
                  class="rounded w-4 h-4"
                  :style="{ background: category.color }"
                ></div>
              </td>
              <td class="p-2">{{ category.name }}</td>
              <td class="p-2">{{ category.vat }} %</td>
              <td class="p-2">
                <span v-if="category.discountId">{{
                  getDiscountForCategory(category.discountId)
                }}</span>
              </td>
              <td class="p-2 max-w-4">{{ category.productsCount }}</td>
              <td class="p-2">
                <button
                  class="flex items-center justify-center"
                  v-if="allowRemoval(category.productsCount)"
                  @click="removeCategory(category.id)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="18px"
                    viewBox="0 0 24 24"
                    width="18px"
                    fill="#000000"
                  >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path
                      d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-4 md:mt-0 lg:flex-1">
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

            <InputGroup
              id="name"
              label="Name"
              :hasError="$v.category.name.$error"
            >
              <template v-slot:errors>
                <p v-if="!$v.category.name.required">
                  The vat field is required
                </p>
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
                  <p v-if="!$v.category.vat.required">
                    The vat field is required
                  </p>
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
                <option value="" disabled selected>
                  Select parent category
                </option>
                <option
                  v-for="parent in parentCategories"
                  :key="parent.id"
                  :value="parent.id"
                >
                  {{ parent.name }}
                </option>
              </Select>
            </InputGroup>

            <DiscountComponent
              :discount-id="category.discountId"
              @remove="removeDiscount"
              @add="addDiscount"
            ></DiscountComponent>
          </div>

          <div>
            <Button
              v-if="categorySelected"
              type="secondary"
              eclass="mb-2"
              @click.native.prevent="clearSelection"
            >
              Clear selection
            </Button>
            <Button
              type="primary"
              :waiting="waiting"
              @click.native.prevent="submit"
            >
              <span v-if="categorySelected"> Update </span>
              <span v-else> Submit </span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  </ViewContainer>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
import ViewContainer from "../ViewContainer";
import DiscountComponent from "../../components/discounts/DiscountComponent";

import Input from "../../components/inputs/TextInputComponent";
import Select from "../../components/inputs/SelectInputComponent";
import Button from "../../components/buttons/ButtonComponent";
import InputGroup from "../../components/inputs/InputGroupComponent";

import _find from "lodash/find";
import _debounce from "lodash/debounce";
import _isEqual from "lodash/isEqual";

import { alphaSpaces } from "../../validators/index";
import {
  required,
  integer,
  maxLength,
  minValue,
} from "vuelidate/lib/validators";

export default {
  computed: {
    ...mapGetters("Categories", ["getCategories"]),
    ...mapGetters("Discounts", ["getDiscounts"]),

    showResetSearch() {
      return this.searchInput.length > 0;
    },

    rules() {
      return _merge({}, this.serverValidation, this.clientValidation);
    },

    availableDiscounts() {
      return this.getDiscounts.filter(
        (discount) => discount.deletedAt === null
      );
    },

    parentCategories() {
      return this.getCategories.filter(
        (category) => category.parentId === null
      );
    },

    isParent() {
      return this.category.parentId === "";
    }
  },

  data() {
    return {
      waiting: false,
      categorySelected: false,
      category: {
        name: "",
        vat: "",
        color: "",
        discountId: "",
        parentId: ""
      },
      searchInput: "",
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
        required,
        integer,
        minValue: minValue(0),
      },
      color: {
        required,
      },
    },
  },

  methods: {
    ...mapActions("Categories", [
      "searchCategory",
      "fetchCategories",
      "postCategory",
      "patchCategory",
      "deleteCategory",
      "updateDiscount",
    ]),
    ...mapActions("Notification", ["openNotification"]),

    allowRemoval(productsCount) {
      return parseInt(productsCount) === 0;
    },

    getDiscountForCategory(id) {
      const discount = _find(this.getDiscounts, ["id", parseInt(id)]);
      return `${discount.code} ${discount.id}%`;
    },

    selectCategory(id) {
      this.category = Object.assign(
        this.category,
        _find(this.getCategories, ["id", id])
      );
      this.categorySelected = true;
      this.$v.$reset();
    },

    clearSelection() {
      this.categorySelected = false;
      this.resetForm();
    },

    async submit() {
      try {
        this.$v.$touch();

        if (!this.$v.$invalid) {
          this.waiting = true;

          if (this.categorySelected) {
            const originalCategory = _find(this.getCategories, [
              "id",
              this.category.id,
            ]);

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

            if (counter > 0) {
              await this.patchCategory(payload);

              payload.category.discountId = this.category.discountId;
              this.updateDiscount(payload);

              this.openNotification({
                type: "ok",
                show: true,
                message: "Category updated",
              });
            } else {
              this.openNotification({
                type: "info",
                show: true,
                message: "Nothing to update",
              });
            }
          } else {
            if (this.category.discount === null) {
              delete this.category.discount;
            }

            if (this.category.discountId === "") {
              delete this.category.discountId;
            }

            await this.postCategory(this.category);

            this.resetForm();

            this.openNotification({
              type: "ok",
              show: true,
              message: "Category added",
            });
          }

          this.waiting = false;
        }
      } catch (error) {
        console.log(error);

        this.waiting = false;

        if (error.response && error.response.data.errors) {
          this.$v.$touch();
        }

        // notificaiton
      }
    },

    async removeCategory(id) {
      try {
        await this.deleteCategory(id);

        if (this.categorySelected) {
          this.clearSelection();
        }
        this.openNotification({
          type: "ok",
          show: true,
          message: "Category removed",
        });
      } catch (error) {
        console.log(error);
      }
    },

    async refresh() {
      try {
        await this.fetchCategories();
      } catch (error) {
        console.log(error);
      }
    },

    search: _debounce(async function () {
      try {
        if (this.searchInput.length > 0) {
          await this.searchCategory(this.searchInput);
        } else {
          await this.fetchCategories();
        }
      } catch (error) {
        console.log(error);
      }
    }, 250),

    resetForm() {
      this.$v.$reset();
      this.category = {
        name: "",
        vat: "",
        color: "",
        discountId: "",
      };
    },

    removeDiscount() {
      this.category.discountId = "";
    },

    addDiscount(discountId) {
      this.category.discountId = discountId;
    },
  },

  components: {
    ViewContainer,
    Input,
    Select,
    Button,
    InputGroup,
    DiscountComponent,
  },
};
</script>