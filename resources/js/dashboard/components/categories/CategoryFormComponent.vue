<template>
  <div class="flex-1">
    <ConfirmActionModal
      v-if="confirmModalState"
      title="Confirm action"
      mainMessage="Are you sure you want to delete the selected category ?"
      @cancel="toggleConfirmModal"
      @ok="remove"
    ></ConfirmActionModal>
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
          :required="true"
        >
          <template v-slot:errors>
            <p v-if="!$v.category.name.required">The name field is required</p>
            <p v-if="!$v.category.name.maxLength">
              The name field must be no longer than 50 characters
            </p>
            <p v-if="!$v.category.name.alphaSpaces">
              The name field must contain only letters or spaces
            </p>
          </template>
          <Input
            v-model="$v.category.name.$model"
            id="name"
            name="name"
            :eclass="{
              'border-red-600': $v.category.name.$error,
              'border-green-600':
                $v.category.name.$dirty && !$v.category.name.$error,
            }"
            :disabled="waiting"
          ></Input>
        </InputGroup>

        <InputGroup
          id="vat"
          label="VAT"
          :hasError="$v.category.vat.$error"
          :required="isParent"
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
            v-model="$v.category.vat.$model"
            id="vat"
            name="vat"
            :eclass="{
              'border-red-600': $v.category.vat.$error,
              'border-green-600':
                $v.category.vat.$dirty && !$v.category.vat.$error,
            }"
            :disabled="waiting"
          ></Input>
        </InputGroup>

        <InputGroup id="parentCategory" label="Parent category">
          <Select
            id="parentCategory"
            name="Parent category"
            type="color"
            v-model="category.parentId"
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
            <option value="-1">Remove parent</option>
          </Select>
        </InputGroup>

        <div class="w-full">
          <DiscountComponent
            :discount-id="discountId"
            @remove="callRemoveDiscount"
            @add="callAddDiscount"
          ></DiscountComponent>
        </div>
      </div>

      <div>
        <div>
          <Button
            type="secondary"
            @click.native.prevent="resetForm"
            :disabled="waiting"
          >
            Reset
          </Button>
        </div>
        <div class="mt-4 flex items-center gap-4">
          <div v-if="isCategorySelected" class="flex gap-x-4">
            <Button
              type="primary"
              @click.native.prevent="patch"
              :disabled="waiting"
            >
              Update
            </Button>
            <Button
              v-if="canDisable"
              type="danger"
              :disabled="waiting"
              @click.native.prevent="callDisableCategory"
            >
              Disable
            </Button>
            <Button
              v-if="canRestore"
              type="secondary"
              :disabled="waiting"
              @click.native.prevent="callRestoreCategory"
            >
              Restore
            </Button>
            <Button
              v-if="canDelete"
              type="danger"
              :disabled="waiting"
              @click.native.prevent="toggleConfirmModal"
            >
              Delete
            </Button>
          </div>
          <Button
            v-else
            type="primary"
            :disabled="waiting"
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

import ConfirmActionModal from "../modals/ConfirmActionModalComponent.vue";

import { mapActions, mapGetters } from "vuex";

import _find from "lodash/find";
import _isEqual from "lodash/isEqual";

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
    selectedCategory: {
      type: Object,
      required: false,
      default: null,
    },
  },

  computed: {
    ...mapGetters("Categories", ["getCategories"]),
    ...mapGetters("Discounts", ["getDiscounts"]),

    parentCategories() {
      return this.getCategories.filter((category) => {
        if (this.selectedCategory) {
          return category.id === this.selectedCategory.id ? false : true;
        } else {
          return true;
        }
      });
    },

    availableDiscounts() {
      return this.getDiscounts.filter((discount) => discount.deletedAt === "");
    },

    canDelete() {
      return this.category.productsCount == 0;
    },

    canDisable() {
      return this.category.deletedAt === null;
    },

    canRestore() {
      return this.category.deletedAt !== null;
    },

    isParent() {
      return this.category.parentId === null;
    },

    isCategorySelected() {
      return this.selectedCategory !== null || this.categoryId !== undefined
        ? true
        : false;
    },

    discountId() {
      if (this.selectedCategory) {
        return this.selectedCategory.discountId;
      }

      return this.category.discountId;
    },
  },

  data() {
    return {
      confirmModalState: false,
      waiting: false,
      category: {
        name: "",
        vat: "",
        discountId: "",
        parentId: null,
        parentName: "",
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
    },
  },

  watch: {
    'category.parentId': async function(value) {
      if(parseInt(value) === -1) {
        await this.callRemoveParent();
      }
    },

    selectedCategory: function (value) {
      if (value) {
        this.category = JSON.parse(JSON.stringify(this.selectedCategory));
      } else {
        this.$v.$reset();

        this.category = {
          name: "",
          vat: "",
          color: "",
          discountId: "",
          parentId: null,
        };
      }
    },
  },

  methods: {
    ...mapActions("Categories", [
      "postCategory",
      "patchCategory",
      "deleteCategory",
      "disableCategory",
      "restoreCategory",
      "addDiscount",
      "removeDiscount",
      "removeParent",
    ]),

    async create() {
      try {
        this.$v.$touch();

        if (!this.$v.$invalid) {
          const payload = this.category;

          if (payload.vat === "") {
            delete payload.vat;
          }

          if (payload.parentId === null) {
            delete payload.parentId;
          }

          if (payload.discountId === "") {
            delete payload.discountId;
          }

          const response = await this.postCategory(payload);

          this.$toast.success(response);

          this.resetForm();
        }
      } catch (error) {
        console.log(error);

        if (error.response) {
          this.$toast.error(error.response.data.error);
        }
      }
    },

    async patch() {
      try {
        this.$v.$touch();

        if (!this.$v.$invalid) {
          this.waiting = true;

          const originalCategory = JSON.parse(
            JSON.stringify(this.selectedCategory)
          );

          const payload = {
            vm: this,
            category: {
              id: originalCategory.id,
              parentId: this.category.parentId,
              originalParentId: originalCategory.parentId,
            },
          };

          let counter = 0;

          Object.keys(this.category).forEach((key) => {
            if (!_isEqual(originalCategory[key], this.category[key])) {
              payload.category[key] = this.category[key];
              counter++;
            }
          });

          if (this.category.discountId === "") {
            delete payload.category.discountId;
          }

          if (this.category.parentId === null) {
            delete payload.category.parentId;
          }

          if (counter > 0) {
            this.$Progress.start();

            await this.patchCategory(payload);

            if (
              payload.category.parentId !== null &&
              payload.category.parentId !== undefined
            ) {
              if (
                !_isEqual(
                  payload.category.originalParentId,
                  payload.category.parentId
                )
              ) {
                let parentCategory = _find(this.parentCategories, [
                  "id",
                  parseInt(payload.category.parentId),
                ]);

                parentCategory.selectedSubcateogryId = payload.category.id;
                this.$emit("selectNewParentCategory", parentCategory);
              }
            }

            this.waiting = false;
            this.$Progress.finish();

            this.$toast.success("Category updated");
          } else {
            this.waiting = false;
            this.$toast.info("Nothing to update");
          }
        }
      } catch (error) {
        this.$Progress.fail();
        this.waiting = false;
        console.log(error);

        if (error.response) {
          this.$toast.error(error.response.data.error);
        }
      }
    },

    async remove() {
      try {
        this.toggleConfirmModal();
        this.$Progress.start();
        this.waiting = true;

        const response = await this.deleteCategory(this.category);

        this.waiting = false;

        this.$Progress.finish();

        this.resetForm();

        this.$toast.success(response);
      } catch (error) {
        this.$Progress.fail();
        this.waiting = false;
        console.log(error);
      }
    },

    async callDisableCategory() {
      try {
        this.$Progress.start();
        const payload = {
          category: this.category,
          vm: this,
        };

        const response = await this.disableCategory(payload);

        this.category.deletedAt = response.deletedAt;

        this.$toast.success(response.message);
        this.$Progress.finish();
      } catch (error) {
        this.$Progress.fail();
        console.log(error);
      }
    },

    async callRestoreCategory() {
      try {
        this.$Progress.start();
        const payload = {
          category: this.category,
          vm: this,
        };
        const response = await this.restoreCategory(payload);
        this.category.deletedAt = null;
        this.$toast.success(response);
        this.$Progress.finish();
      } catch (error) {
        this.$Progress.fail();
        console.log(error);
      }
    },

    async callRemoveParent() {
      try {
        this.$Progress.start();

        const payload =  {
          vm: this,
          id: this.category.id,
          parentId: this.category.parentId
        };

        const response = await this.removeParent(payload);

        this.$toast.success(response.data.message);
        this.$Progress.finish();

      } catch ( error ) {
        if(error.response && error.response.data.message) {
          this.$toast.error(error.response.data.message);
        } else {
          this.$toast.error('Something went wrong. Try again later');
        }

        this.$Progress.fail();

        console.log(error);
      }
    },

    toggleConfirmModal() {
      this.confirmModalState = !this.confirmModalState;
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

    async callRemoveDiscount() {
      try {
        if (this.selectedCategory) {
          this.$Progress.start();
          this.waiting = true;

          const payload = {
            id: this.category.id,
            parentId: this.category.parentId,
            vm: this,
          };

          const response = await this.removeDiscount(payload);

          this.selectedCategory.discountId = "";

          this.$Progress.finish();
          this.$toast.success(response.data.message);
          this.waiting = false;
        } else {
          this.category.discountId = "";
        }
      } catch (error) {
        if (error.response) {
          this.$toast.error(error.response.data.message);
        } else {
          this.$toast.error("Something went wrong, try agian later");
        }

        this.$Progress.fail();
        this.waiting = false;
      }
    },

    async callAddDiscount(discountId) {
      try {
        if (this.selectedCategory) {
          this.$Progress.start();
          this.waiting = true;
          const payload = {
            id: this.category.id,
            parentId: this.category.parentId,
            discountId,
            vm: this,
          };

          const response = await this.addDiscount(payload);

          this.$toast.success(response.data.message);
          this.$Progress.finish();

          this.selectedCategory.discountId = discountId;
        } else {
          this.category.discountId = discountId;
        }

        this.waiting = false;
      } catch (error) {
        this.waiting = false;
        this.$Progress.fail();

        if (error.response) {
          this.$toast.error(error.response.data.message);
        }
      }
    },
  },

  components: {
    Input,
    Select,
    Button,
    InputGroup,
    DiscountComponent,
    ConfirmActionModal,
  },
};
</script>