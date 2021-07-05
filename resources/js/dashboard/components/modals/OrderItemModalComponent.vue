<template>
  <Modal @close="close">
    <template v-slot:header> Product </template>

    <template v-slot:body>
      <div class="flex flex-col gap-3 md:flex-row md:items-center">
        <InputGroup
          id="productName"
          label="Name"
          :hasError="$v.product.name.$error"
          :eclass="{ 'flex-1': true }"
        >
          <template v-slot:errors>
            <p v-if="!$v.product.name.required">The name field is required</p>
            <p v-if="!$v.product.name.alphaSpaces">
              Then name field must contain only letters or spaces
            </p>
          </template>

          <div class="relative flex items-center">
            <Input
              ref="productName"
              v-model.lazy="$v.product.name.$model"
              id="productName"
              :disabled="edit"
              :class="{
                'border-red-600': $v.product.name.$error,
                'border-green-600':
                  $v.product.name.$dirty && !$v.product.name.$error,
                'mr-4': searching,
              }"
              @input="findProduct"
            ></Input>
            <Spinner
              v-if="searching"
              size="small"
              :spacing="24"
              :line-size="7"
              :font-size="20"
              line-fg-color="#0084C7"
            ></Spinner>

            <ul
              v-if="foundProducts.length > 0"
              class="
                absolute
                z-50
                top-10
                right-0
                left-0
                bg-white
                text-xs text-gray-800
                hover:text-black
                rounded
                shadow
              "
            >
              <li
                v-for="product in foundProducts"
                :key="product.id"
                @click="selectProduct(product)"
                class="p-2 cursor-pointer hover:bg-gray-100"
              >
                {{ product.name }}
              </li>
            </ul>
          </div>
        </InputGroup>

        <InputGroup
          id="productPrice"
          label="Price"
          :eclass="{ 'flex-1': true }"
        >
          <Input
            v-model="product.unitPrice"
            id="productName"
            :disabled="true"
          ></Input>
        </InputGroup>
      </div>

      <div class="mt-3 flex flex-col gap-3 md:flex-row md:items-center">
        <InputGroup
          id="productStock"
          label="Stock"
          :eclass="{ 'flex-1': true }"
        >
          <Input
            v-model="product.stock"
            id="productStock"
            :disabled="true"
          ></Input>
        </InputGroup>

        <InputGroup
          id="productQuantity"
          label="Quantity"
          :hasError="$v.product.quantity.$error"
          :eclass="{ 'flex-1': true }"
        >
          <template v-slot:errors>
            <p v-if="!$v.product.quantity.required">
              The quantity field is required
            </p>
            <p v-if="!$v.product.quantity.integer">
              Then quantity field must by an integer
            </p>
            <p v-if="!$v.product.quantity.maxValue">
              Can't sell more products that are in stock
            </p>
            <p v-if="!$v.product.quantity.minValue">
              The quantity must be at least 1
            </p>
          </template>

          <Input
            :disabled="edit"
            v-model="$v.product.quantity.$model"
            id="productQuantity"
            ref="quantity"
            :class="{
              'border-red-600': $v.product.quantity.$error,
              'border-green-600':
                $v.product.quantity.$dirty && !$v.product.quantity.$error,
            }"
          ></Input>
        </InputGroup>

        <InputGroup
          v-if="edit"
          id="productQuantity"
          label="New Quantity"
          :hasError="$v.newQuantity.$error"
          :eclass="{ 'flex-1': true }"
          ref="newQuantity"
        >
          <template v-slot:errors>
            <p v-if="!$v.newQuantity.required">
              The newQuantity field is required
            </p>
            <p v-if="!$v.newQuantity.integer">
              Then newQuantity field must by an integer
            </p>
            <p v-if="!$v.newQuantity.maxValue">
              Can't sell more products that are in stock
            </p>
          </template>

          <Input
            v-model="$v.newQuantity.$model"
            id="productQuantity"
            :class="{
              'border-red-600': $v.newQuantity.$error,
              'border-green-600':
                $v.newQuantity.$dirty && !$v.newQuantity.$error,
            }"
          ></Input>
        </InputGroup>
      </div>
    </template>

    <template v-slot:footer>
      <button
        @click.prevent="save"
        class="
          flex
          items-center
          bg-sky-700
          rounded-sm
          text-xs
          py-1
          px-4
          mr-2
          text-white
          mt-2
          hover:bg-sky-600
          active:bg-sky-500
          active:shadow-inner
          disabled:bg-gray-500
          disabled:pointer-events-none
        "
      >
        Save
      </button>
      <button
        @click.prevent="close"
        class="
          bg-transparent
          rounded-sm
          text-xs
          py-1
          px-4
          text-black text-bold
          mt-2
          hover:text-gray-600
        "
      >
        Cancel
      </button>
    </template>
  </Modal>
</template>

<script>
import Modal from "./ModalComponent";

import { fetchProductsByName, fetchProductById } from "../../api/orders.api";

import {
  required,
  integer,
  maxValue,
  minValue,
} from "vuelidate/lib/validators";
import { alphaSpaces } from "../../validators/index";

import Input from "../../components/inputs/TextInputComponent";
import InputGroup from "../../components/inputs/InputGroupComponent";
import Spinner from "vue-simple-spinner";

import _debounce from "lodash/debounce";
import requiredIf from "vuelidate/lib/validators/requiredIf";

export default {
  props: {
    id: {
      type: [Number, String],
      required: false,
      default: null,
    },
    quantity: {
      type: [Number, String],
      required: false,
      default: "",
    },
  },

  async mounted() {
    if (this.id && this.quantity) {
      this.searching = true;
      this.edit = true;
      const repsonse = await fetchProductById(this.id);
      repsonse.data.data.quantity = this.quantity;
      this.product = repsonse.data.data;
      if (this.product === null) {
        this.edit = false;
      }
      this.searching = false;
      this.$nextTick(() => {
        this.$refs.newQuantity.$el.focus();
      });
    } else {
      this.$nextTick(() => {
        this.$refs.productName.$el.focus();
      });
    }
  },

  data() {
    return {
      product: {
        name: "",
        stock: "",
        quantity: "",
        unitPrice: "",
      },
      newQuantity: "",
      searching: false,
      edit: false,
      foundProducts: [],
    };
  },

  validations() {
    return {
      product: {
        name: {
          required,
          alphaSpaces,
        },
        quantity: {
          required: requiredIf(function () {
            return !this.edit;
          }),
          integer,
          minValue: minValue(1),
          maxValue: () => {
            if(this.edit){
              return 9999999999;
            } else {
              return this.product.quantity
            }
          },
        },
      },
      newQuantity: {
        required: requiredIf(function () {
          return this.edit;
        }),
        integer,
        maxValue: maxValue(this.product.stock),
      },
    };
  },

  methods: {
    findProduct: _debounce(async function () {
      try {
        if (this.product.name.length > 1) {
          const response = await fetchProductsByName(this.product.name);
          this.foundProducts = response.data.data;
        }
      } catch (error) {
        console.log(error);
      }
    }, 250),

    selectProduct(product) {
      product.quantity = "";
      this.product = product;
      this.foundProducts = [];
    },

    save() {
      this.$v.product.$touch();

      if (!this.$v.$invalid) {
        if (this.edit) {
          if (this.newQuantity != this.product.quantity) {
            const payload = {
              id: this.product.id,
              newQuantity: this.newQuantity,
            };
            this.$emit("edit", payload);
            this.$emit("closed");
          } else {
            // notificare
            console.log("nothing to update");
          }
        } else {
          this.$emit("add", this.product);
          this.$emit("closed");
        }
      }
    },

    close() {
      this.$emit("closed");
    },
  },

  components: {
    Modal,
    Input,
    InputGroup,
    Spinner,
  },
};
</script>