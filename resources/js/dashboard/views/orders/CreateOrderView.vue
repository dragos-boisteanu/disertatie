<template>
  <ViewContainer>
    <template slot="header"> Create order </template>

    <OrderItemModal
      v-if="showAddProductModalState"
      :id="selectedItemId"
      :quantity="selectedItemQuantity"
      @closed="closeAddProductModal"
      @add="addProductToOrder"
      @edit="saveEdit"
    ></OrderItemModal>

    <form class="flex flex-col">
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
              id="clientFirstName"
              label="First name"
              :hasError="$v.client.firstName.$error"
              :eclass="{ 'flex-1': true }"
              :required="!isTableOrder"
            >
              <template v-slot:errors>
                <p v-if="!$v.client.firstName.required">
                  The client first name field is required
                </p>
                <p v-if="!$v.client.firstName.maxLength">
                  The client first name must not be longer than 50 characters
                </p>
                <p v-if="!$v.client.firstName.alphaSpaces">
                  The client first name field must contain only letters and
                  spaces
                </p>
              </template>
              <Input
                v-model="$v.client.firstName.$model"
                id="clientFirstName"
                name="clientFirstName"
                :class="{
                  'border-red-600': $v.client.firstName.$error,
                  'border-green-600':
                    $v.client.firstName.$dirty && !$v.client.firstName.$error,
                }"
              ></Input>
            </InputGroup>

            <InputGroup
              id="clientLastName"
              label="Last name"
              :hasError="$v.client.lastName.$error"
              :eclass="{ 'flex-1': true }"
            >
              <template v-slot:errors>
                <p v-if="!$v.client.lastName.maxLength">
                  The client name must not be longer than 50 characters
                </p>
                <p v-if="!$v.client.lastName.alphaSpaces">
                  The client name field must contain only letters and spaces
                </p>
              </template>
              <Input
                v-model="client.lastName"
                id="clientLastName"
                name="clientLastName"
                :class="{
                  'border-red-600': $v.client.lastName.$error,
                  'border-green-600':
                    $v.client.lastName.$dirty && !$v.client.lastName.$error,
                }"
                @blur.native="$v.client.lastName.$touch()"
              ></Input>
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
              id="clientPhoneNumber"
              label="Phone number"
              :hasError="$v.order.phoneNumber.$error"
              :eclass="{ 'flex-1': true }"
              :required="!isTableOrder"
            >
              <template v-slot:errors>
                <p v-if="!$v.order.phoneNumber.required">
                  The client phobe number field is required
                </p>
              </template>
              <Input
                v-model="$v.order.phoneNumber.$model"
                id="clientPhoneNumber"
                name="clientPhoneNumber"
                :class="{
                  'border-red-600': $v.order.phoneNumber.$error,
                  'border-green-600':
                    $v.order.phoneNumber.$dirty && !$v.order.phoneNumber.$error,
                }"
                @blur.native="getClient"
              ></Input>
            </InputGroup>

            <InputGroup
              id="clientEmail"
              label="Email"
              :hasError="$v.order.email.$error"
              :eclass="{ 'flex-1': true }"
            >
              <template v-slot:errors>
                <p v-if="!$v.order.email.email">
                  The client email field must have an valid email address
                </p>
              </template>
              <Input
                v-model="$v.order.email.$model"
                id="clientEmail"
                name="clientEmail"
                :class="{
                  'border-red-600': $v.order.email.$error,
                  'border-green-600':
                    $v.order.email.$dirty && !$v.order.email.$error,
                }"
              ></Input>
            </InputGroup>
          </div>

          <InputGroup
            id="orderDeliveryMethod"
            label="Delivery method"
            :hasError="$v.order.deliveryMethodId.$error"
            :eclass="{ 'flex-initial': true }"
            :required="true"
          >
            <template v-slot:errors>
              <p v-if="!$v.order.deliveryMethodId.required">
                The delivery method field is required
              </p>
            </template>
            <Select
              @change.native="deliveryMethodChanged"
              v-model="$v.order.deliveryMethodId.$model"
              id="orderDeliveryMethod"
              name="orderDeliveryMethod"
              :class="{
                'border-red-600': $v.order.deliveryMethodId.$error,
                'border-green-600':
                  $v.order.deliveryMethodId.$dirty &&
                  !$v.order.deliveryMethodId.$error,
              }"
            >
              <option value="" selected disabled>Select delivery method</option>
              <option
                v-for="method in getDeliveryMethods"
                :key="method.id"
                :value="method.id"
              >
                {{ method.name }} ({{ method.price }} Ron)
              </option>
            </Select>
          </InputGroup>

          <div
            class="flex flex-col gap-2 md:flex-row md:items-center"
            v-if="isTableOrder || isDeliveryOrder"
          >
            <div class="w-full" v-if="isDeliveryOrder">
              <InputGroup
                v-if="client.addresses.length > 0"
                id="clientAddresses"
                label="Adrress"
                :eclass="{ 'flex-1': true }"
              >
                <Select
                  v-model="order.address"
                  id="clientAddresses"
                  name="clientAddresses"
                >
                  <option value="" selected disabled>
                    Select client address
                  </option>
                  <option
                    v-for="(address, index) in client.addresses"
                    :key="index"
                    :value="address.address"
                  >
                    {{ address.address }}
                  </option>
                </Select>
              </InputGroup>

              <InputGroup
                v-if="isDeliveryOrder"
                id="clientAddress"
                label="Adrress"
                :hasError="$v.order.address.$error"
                :eclass="{ 'flex-1': true }"
                :required="true"
              >
                <template v-slot:errors>
                  <p v-if="!$v.order.address.required">
                    The address field is required
                  </p>
                  <p v-if="!$v.order.address.alphaNumSpaces">
                    The address field must contain only letters, spaces or
                    numbers
                  </p>
                </template>
                <Input
                  v-model="order.address"
                  id="orderAddress"
                  name="clientAddress"
                  :class="{
                    'border-red-600': $v.order.address.$error,
                    'border-green-600':
                      $v.order.address.$dirty && !$v.order.address.$error,
                  }"
                  @blur.native="$v.order.address.$touch()"
                ></Input>
              </InputGroup>
            </div>

            <InputGroup
              v-if="isTableOrder"
              id="tableId"
              label="Table"
              :hasError="$v.order.tableId.$error"
              :eclass="{ 'flex-1': true }"
              :required="true"
            >
              <template v-slot:errors>
                <p v-if="!$v.order.tableId.required">
                  The table number field is required
                </p>
                <p v-if="!$v.order.tableId.numeric">
                  The table ID must be numeric
                </p>
              </template>
              <Select
                v-model="order.tableId"
                id="orderTableId"
                name="orderTableId"
                :class="{
                  'border-red-600': $v.order.tableId.$error,
                  'border-green-600':
                    $v.order.tableId.$dirty && !$v.order.tableId.$error,
                }"
                @blur.native="$v.order.tableId.$touch()"
              >
                <option value="" selected disabled>Select table</option>
                <option
                  v-for="table in getTables"
                  :key="table.id"
                  :value="table.id"
                  :disabled="
                    table.status.name === 'Busy' ||
                    table.status.name === 'Disabled'
                  "
                >
                  {{ table.name }}
                </option>
              </Select>
            </InputGroup>
          </div>

          <InputGroup
            id="observations"
            label="Observations"
            :hasError="$v.order.observations.$error"
          >
            <template v-slot:errors>
              <p v-if="!$v.order.observations.alphaNumSpaces">
                The observations field should only contain letters, numbers or
                spaces
              </p>
            </template>
            <Textarea
              v-model="order.observations"
              id="observations"
              name="observations"
              :class="{
                'border-red-600': $v.order.observations.$error,
                'border-green-600':
                  $v.order.observations.$dirty && !$v.order.observations.$error,
              }"
              @blur.native="$v.order.observations.$touch()"
            ></Textarea>
          </InputGroup>

          <!-- ORDER'S PRODUCTS TABLE -->
          <div>
            <div class="text-sm font-semibold">
              Products <span class="text-red-500">*</span>
            </div>
            <div
              v-if="$v.order.items.$error"
              class="text-xs text-red-600 font-semibold"
            >
              <p v-if="!$v.order.items.required">
                The order must have products
              </p>
              <p v-if="!$v.order.items.minLength">
                The order must have at least 1 product
              </p>
            </div>
            <div class="w-full overflow-y-auto">
              <table class="mt-1 px-2 w-full rounded-sm text-center">
                <thead class="w-full bg-gray-700 text-orange-500">
                  <tr class="text-left text-sm">
                    <th class="p-2 text-center rounded-tl">#</th>
                    <th class="p-2 text-center">Name</th>
                    <th class="p-2 text-center">Quantity</th>
                    <th class="p-2 text-center">
                      <div>Unit Price</div>
                      <div>(includes VAT + Discount)</div>
                    </th>
                    <th class="p-2 text-center">Total Price</th>
                    <th class="p-2"></th>
                  </tr>
                </thead>
                <tbody class="overflow-y-auto">
                  <OrderItem
                    v-for="(item, index) in order.items"
                    :key="index"
                    :item="item"
                    :index="index"
                    @edit="editOrderProduct(item)"
                    @remove="removeProductFromOrder"
                  ></OrderItem>
                  <tr
                    v-if="order.items.length > 0"
                    class="mt-1 font-bold border-t"
                  >
                    <td colspan="2" class="p-2 text-center">TOTAL</td>
                    <td class="p-2">{{ orderTotalQuantity }}</td>
                    <td class="p-2"></td>
                    <td class="p-2 text-center">{{ orderTotalPrice }} Ron</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button
              id="addItemBtn"
              class="
                w-full
                py-1
                mt-2
                text-white text-sm
                ripple-bg-orange-400
                rounded-sm
              "
              @click.prevent="openAddProductModal"
            >
              Add product
            </button>
          </div>
        </div>
      </div>

      <div class="mt-5 flex md:justify-start">
        <Button type="primary" @click.native.prevent="submit"> Submit </Button>
      </div>
    </form>
  </ViewContainer>
</template>

<script>
import ViewContainer from "../ViewContainer";
import Input from "../../components/inputs/TextInputComponent";
import InputGroup from "../../components/inputs/InputGroupComponent";
import Textarea from "../../components/inputs/TextareaInputComponent";
import Select from "../../components/inputs/SelectInputComponent";
import Button from "../../components/buttons/ButtonComponent";

import OrderItem from "../../components/orders/OrderItemComponent";
import OrderItemModal from "../../components/modals/OrderItemModalComponent";

import { downloadClientByPhoneNumber } from "../../api/client.api";
import { downloadProductByBarcode } from "../../api/products.api";

import {
  required,
  numeric,
  minLength,
  maxLength,
  email,
  requiredIf,
} from "vuelidate/lib/validators";
import { alphaSpaces, alphaNumSpaces } from "../../validators/index";

import { mapActions, mapGetters } from "vuex";

import { storeOrder } from "../../api/orders.api";

import _find from "lodash/find";
import _findIndex from "lodash/findIndex";

export default {
  computed: {
    ...mapGetters("DeliveryMethods", ["getDeliveryMethods"]),
    ...mapGetters("Tables", ["getTables"]),

    orderTotalQuantity() {
      let totalQuantity = 0;
      this.order.items.forEach((item) => {
        totalQuantity += parseInt(item.quantity);
      });

      return totalQuantity;
    },

    orderTotalPrice() {
      let totalPrice = 0;

      if (this.order.deliveryMethodId) {
        const deliveryMethod = _find(this.getDeliveryMethods, [
          "id",
          parseInt(this.order.deliveryMethodId),
        ]);
        totalPrice += parseFloat(deliveryMethod.price);
      }
      this.order.items.forEach((item) => {
        totalPrice += parseFloat(item.price * item.quantity);
      });
      return totalPrice.toFixed(2);
    },

    isDeliveryOrder() {
      return parseInt(this.order.deliveryMethodId) === 1;
    },

    isTableOrder() {
      return parseInt(this.order.deliveryMethodId) === 3;
    },
  },

  data() {
    return {
      client: {
        firstName: "",
        lastName: "",
        addresses: [],
        id: "",
      },

      order: {
        phoneNumber: "",
        email: "",
        address: "",
        tableId: "",
        deliveryMethodId: "",
        observations: "",
        items: [],
      },

      selectedItemId: "",
      selectedItemQuantity: "",
      showAddProductModalState: false,
    };
  },

  validations: {
    client: {
      lastName: {
        maxLength: maxLength(50),
        alphaSpaces,
      },
      firstName: {
        required: requiredIf(function () {
          return !this.isTableOrder;
        }),
        maxLength: maxLength(50),
        alphaSpaces,
      },
    },

    order: {
      phoneNumber: {
        required: requiredIf(function () {
          return !this.isTableOrder;
        }),
      },

      email: {
        email,
      },

      address: {
        required: requiredIf(function () {
          return this.isDeliveryOrder;
        }),
        alphaNumSpaces,
      },

      tableId: {
        requiredIf: requiredIf(function () {
          return this.isTableOrder;
        }),
        numeric,
      },

      deliveryMethodId: {
        required,
        numeric,
      },
      observations: {
        alphaNumSpaces,
      },
      items: {
        required,
        minLength: minLength(1),
      },
    },
  },

  methods: {
    ...mapActions("Users", ["getUserByPhoneNumber"]),
    ...mapActions("Counties", ["fetchCitites"]),
    ...mapActions("Notification", ["openNotification"]),

    async submit() {
      try {
        this.$v.$touch();

        if (!this.$v.$invalid) {
          const payload = {};

          if (this.client.id) {
            payload.clientId = this.client.id;
          }

          if (this.client.firstName) {
            payload.name = this.client.firstName;
          }

          if (this.order.email) {
            payload.email = this.order.email;
          }

          if (this.order.address && this.isDeliveryOrder) {
            payload.address = this.order.address;
          }

          if (parseInt(this.order.deliveryMethodId) === 2) {
            payload.address = "Local";
          }

          if (this.order.tableId && this.isTableOrder) {
            payload.tableId = this.order.tableId;
          }

          if (this.order.observations) {
            payload.observations = this.order.observations;
          }

          payload.phoneNumber = this.order.phoneNumber;
          payload.deliveryMethodId = this.order.deliveryMethodId;
          payload.items = this.order.items;

          const response = await storeOrder(payload);

          this.$toast.success(response.data.message);
          
          this.resetForm();
        }
      } catch (error) {
        console.log(error);

        if (error.response && error.response.data.message) {
          this.$toast.error(response.data.message);
        }
      }
    },

    async getClient() {
      try {
        this.$v.order.phoneNumber.$touch();

        if (!this.$v.order.phoneNumber.$invalid) {
          const response = await downloadClientByPhoneNumber(
            this.order.phoneNumber
          );

          if (response.data.data) {
            const client = response.data.data;

            this.client.firstName = client.firstName;
            this.client.lastName = client.lastName;
            this.client.id = client.id;

            this.client.addresses = client.addresses;

            this.order.email = client.email;
          }
        }
      } catch (error) {}
    },

    saveEdit(product) {
      const existingProductIndex = _findIndex(this.order.items, [
        "id",
        parseInt(product.id),
      ]);
      this.$set(
        this.order.items[existingProductIndex],
        "quantity",
        parseInt(product.newQuantity)
      );
      this.$toast.info("Product quantity updated");
    },

    addProductToOrder(product) {
      const existingProduct = _find(this.order.items, [
        "id",
        parseInt(product.id),
      ]);
      const existingProductIndex = _findIndex(this.order.items, [
        "id",
        parseInt(product.id),
      ]);

      if (existingProduct) {
        const newQuantity =
          parseInt(existingProduct.quantity) + parseInt(product.quantity);
        if (newQuantity <= existingProduct.stock) {
          this.$set(
            this.order.items[existingProductIndex],
            "quantity",
            newQuantity
          );

          this.$toast.info("Product quantity updated");
        } else {
          this.$toast.error(
            "Product total quantity is greater than the available stock"
          );
        }
      } else {
        this.order.items.push(product);
        this.$toast.success("Product added");
      }
    },

    removeProductFromOrder(id) {
      const productIndex = _findIndex(this.order.items, ["id", parseInt(id)]);
      this.order.items.splice(productIndex, 1);
      this.$toast.success("Product removed from order");
    },

    editOrderProduct(product) {
      this.selectedItemId = product.id;
      this.selectedItemQuantity = product.quantity;
      this.showAddProductModalState = true;
    },

    openAddProductModal() {
      this.showAddProductModalState = true;
    },

    closeAddProductModal() {
      this.showAddProductModalState = false;
      if (this.selectedItemId && this.selectedItemQuantity) {
        this.selectedItemId = "";
        this.selectedItemQuantity = "";
      }
    },

    async getDeliveryMethodProduct(barcode) {
      const response = await downloadProductByBarcode(barcode);
      const product = response.data;

      return {
        id: product.id,
        name: product.name,
        quantity: 1,
        basePrice: parseFloat(product.price),
        price: parseFloat(product.price),
      };
    },

    removeDeliveryProductFromOrder(id) {
      const index = _findIndex(this.order.items, ["id", parseInt(id)]);

      if (index > -1) {
        this.order.items.splice(index, 1);
      }
    },

    deliveryMethodChanged() {
      this.$v.$reset();
      this.order.address = "";
      this.order.tableId = "";
    },

    resetForm() {
      this.$v.$reset();

      this.client = {
        firstName: "",
        lastName: "",
        addresses: [],
        id: "",
      };

      this.order = {
        phoneNumber: "",
        email: "",
        address: "",
        deliveryMethodId: "",
        observations: "",
        items: [],
      };

      (this.selectedItemId = ""),
        (this.selectedItemQuantity = ""),
        (this.showAddProductModalState = false);
    },
  },

  components: {
    ViewContainer,
    Input,
    InputGroup,
    Select,
    Textarea,
    Button,
    OrderItem,
    OrderItemModal,
  },
};
</script>