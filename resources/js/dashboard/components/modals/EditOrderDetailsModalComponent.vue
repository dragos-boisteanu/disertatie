<template>
  <Modal @close="close">
    <template slot="header"> Order Details </template>

    <template slot="body">
      <form class="flex flex-col gap-y-4">
        <InputGroup
          v-if="clientAddresses.length > 0"
          id="addresses"
          label="Client adrresses"
          :eclass="{ 'flex-1': true }"
        >
          <Select
            v-model="localData.address"
            id="addresses"
            name="clientAddresses"
          >
            <option value="" selected disabled>Select client address</option>
            <option
              v-for="(address, index) in clientAddresses"
              :key="index"
              :value="address.address"
            >
              {{ address.address }}
            </option>
          </Select>
        </InputGroup>

        <InputGroup
          v-if="address"
          id="address"
          label="Adrress"
          :hasError="$v.localData.address.$error"
          :eclass="{ 'flex-1': true }"
          :required="true"
        >
          <template v-slot:errors>
            <p v-if="!$v.localData.address.required">
              The address field is required
            </p>
            <p v-if="!$v.localData.address.alphaNumSpaces">
              The address field must contain only letters, spaces or numbers
            </p>
          </template>
          <Input
            v-model="$v.localData.address.$model"
            id="address"
            name="address"
            :class="{
              'border-red-600': $v.localData.address.$error,
              'border-green-600':
                $v.localData.address.$dirty && !$v.localData.address.$error,
            }"
          ></Input>
        </InputGroup>

        <InputGroup
          id="observations"
          label="Observations"
          :hasError="$v.localData.observations.$error"
        >
          <template v-slot:errors>
            <p v-if="!$v.localData.observations.alphaNumSpaces">
              The observations field should only contain letters, numbers or
              spaces
            </p>
          </template>
          <Textarea
            v-model="$v.localData.observations.$model"
            id="observations"
            name="observations"
            :class="{
              'border-red-600': $v.localData.observations.$error,
              'border-green-600':
                $v.localData.observations.$dirty &&
                !$v.localData.observations.$error,
            }"
          ></Textarea>
        </InputGroup>
      </form>
    </template>

    <template slot="footer">
      <button
        @click.prevent="submit"
        :disabled="waiting"
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
        :disabled="waiting"
        class="
          bg-transparent
          rounded-sm
          text-xs
          py-1
          px-4
          text-black text-bold
          mt-2
          hover:text-gray-600
          disabled:pointer-events-none
        "
      >
        Cancel
      </button>
    </template>
  </Modal>
</template>

<script>
import Modal from "./ModalComponent";
import InputGroup from "../../components/inputs/InputGroupComponent";
import Input from "../../components/inputs/TextInputComponent";
import Textarea from "../../components/inputs/TextareaInputComponent";
import Select from "../../components/inputs/SelectInputComponent";

import { downoloadClientAddress } from "../../api/client.api";

import { requiredIf } from "vuelidate/lib/validators";
import { alphaNumSpaces } from "../../validators/index";

import { patchOrder } from "../../api/orders.api";

export default {
  props: {
    clientId: {
      type: [String, Number],
      required: false,
      default: null,
    },
    orderId: {
      type: [String, Number],
      required: true,
    },
    address: {
      type: String,
      required: false,
      default: "",
    },
    observations: {
      type: String,
      required: false,
      default: "",
    },
  },

  async mounted() {
    if (this.clientId) {
      const response = await downoloadClientAddress(this.clientId);
      this.clientAddresses = response.data.data.addresses;
    }

    this.localData.address = this.address;
    this.localData.observations = this.observations;
  },

  data() {
    return {
      clientAddresses: [],
      localData: {
        address: "",
        observations: "",
      },
      waiting: false,
    };
  },

  validations: {
    localData: {
      address: {
        required: requiredIf(function () {
          return this.address;
        }),
        alphaNumSpaces,
      },
      observations: {
        alphaNumSpaces,
      },
    },
  },

  methods: {
    async submit() {
      try {
        this.$v.$touch();

        if (!this.$v.$invalid) {
          const payload = {
            id: this.orderId,
          };

          let counter = 0;

          if (this.address !== this.localData.address) {
            payload.address = this.localData.address;
            counter++;
          }

          if (this.observations !== this.localData.observations) {
            payload.observations = this.localData.observations;
            counter++;
          }

          if (counter > 0) {
            this.waiting = true;

            const response = await patchOrder(payload);

            this.waiting = false;

            payload.updatedAt = response.data;

            this.$emit("update", payload);
            this.close();
          } else {
            console.log("nothing to update");
          }
        } else {
          console.log(this.$v);
        }
      } catch (error) {
        this.waiting = false;
      }
    },

    close() {
      this.$emit("closed");
    },
  },

  components: {
    Modal,
    InputGroup,
    Select,
    Textarea,
    Input,
  },
};
</script>