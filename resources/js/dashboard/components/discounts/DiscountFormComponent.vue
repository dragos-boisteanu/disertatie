<template>
  <div class="mt-4 md:mt-0 lg:flex-1">
    <ConfirmActionModal
      v-if="confirmModalState"
      title="Confirm action"
      mainMessage="Are you sure you want to delete the selected discount ?"
      secondaryMessage="By deleting the discount it will be removed from all products and categories"
      @cancel="toggleConfirmModal"
      @ok="callDeleteDiscount"
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
        <h2 class="mb-5 text-xl font-semibold">Discount</h2>

        <div class="flex-1 flex gap-x-4">
          <InputGroup
            id="name"
            label="Code"
            :hasError="$v.discount.code.$error"
          >
            <template v-slot:errors>
              <p v-if="!$v.discount.code.required">
                The code field is required
              </p>
              <p v-if="!$v.discount.code.alphaNum">
                The code field must contain only letters or numbers
              </p>
              <p v-if="!$v.discount.code.maxLength">
                The code field should not be longer than 25 characters
              </p>
            </template>
            <Input
              v-model="$v.discount.code.$model"
              id="code"
              name="code"
              :eclass="{
                'border-red-600': $v.discount.code.$error,
                'border-green-600':
                  $v.discount.code.$dirty && !$v.discount.code.$error,
              }"
              :disabled="waiting"
            ></Input>
          </InputGroup>

          <InputGroup
            id="value"
            label="Value"
            :hasError="$v.discount.value.$error"
          >
            <template v-slot:errors>
              <p>The value field is required</p>
              <p v-if="!$v.discount.value.integer">
                The value field must be an integer
              </p>
              <p v-if="!$v.discount.value.minValue">
                The value must be at least 1
              </p>
            </template>
            <Input
              v-model="$v.discount.value.$model"
              id="value"
              name="value"
              :eclass="{
                'border-red-600': $v.discount.value.$error,
                'border-green-600':
                  $v.discount.value.$dirty && !$v.discount.value.$error,
              }"
              :disabled="waiting"
            ></Input>
          </InputGroup>
        </div>

        <div class="flex-1 flex gap-x-4">
          <div
            class="
              w-full
              flex flex-col
              gap-y-4
              sm:flex-row
              justify-between
              mt-3
              gap-x-4
            "
          >
            <InputGroup
              id="from"
              label="From"
              :hasError="$v.discount.startsAt.$error"
            >
              <template v-slot:errors>
                <p v-if="!$v.discount.startsAt.required">
                  From date is required
                </p>
              </template>
              <date-picker
                v-model="$v.discount.startsAt.$model"
                type="datetime"
                placeholder="Start date"
                confirm-text="Ok"
                valueType="format"
                :input-class="startsAtClass"
                :confirm="true"
                :disabled="enableFromDate"
                :disabled-date="disableDatesInterval"
              >
              </date-picker>
            </InputGroup>
            <InputGroup
              id="to"
              label="To"
              :hasError="$v.discount.endsAt.$error"
            >
              <template v-slot:errors>
                <p v-if="!$v.discount.endsAt.required">To date is required</p>
              </template>
              <date-picker
                v-model="$v.discount.endsAt.$model"
                type="datetime"
                placeholder="End date"
                confirm-text="Ok"
                valueType="format"
                :input-class="endsAtClass"
                :confirm="true"
                :disabled="enableToDate"
                :disabled-date="disableBeforeFromDate"
              >
              </date-picker>
            </InputGroup>
          </div>
        </div>
      </div>
      <div>
        <Button
          type="secondary"
          @click.native.prevent="resetForm"
          :disabled="waiting"
          eclass="mb-3 md:mb-0"
        >
          Reset
        </Button>
      </div>
      <div>
        <Button
          v-if="isDiscountSelected"
          type="primary"
          :waiting="waiting"
          :disabled="waiting"
          @click.native.prevent="callPatchDiscount"
        >
          Update
        </Button>
        <Button
          v-else
          type="primary"
          :disabled="waiting"
          @click.native.prevent="submit"
        >
          Submit
        </Button>
        <span v-if="isDiscountSelected">
          <Button
            v-if="canRestore"
            :disabled="waiting"
            @click.native.prevent="callRestoreDiscount"
          >
            <span> Restore </span>
          </Button>
          <Button
            v-else
            :disabled="waiting"
            @click.native.prevent="callDisableDiscount"
          >
            <span> Disable </span>
          </Button>
          <Button
            v-if="canDelete"
            type="danger"
            :disabled="waiting"
            @click.native.prevent="toggleConfirmModal"
          >
            <span> Delete </span>
          </Button>
        </span>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import Input from "../../components/inputs/TextInputComponent";
import InputGroup from "../../components/inputs/InputGroupComponent";
import Button from "../../components/buttons/ButtonComponent";
import ConfirmActionModal from "../modals/ConfirmActionModalComponent.vue";
import DatePicker from "vue2-datepicker";

import _find from "lodash/find";

import {
  required,
  integer,
  alphaNum,
  maxLength,
  minValue,
} from "vuelidate/lib/validators";

export default {
  props: {
    discountId: {
      type: [Number, String],
      required: false,
      default: null,
    },
  },
  computed: {
    ...mapGetters("Discounts", ["getDiscounts"]),

    enableToDate() {
      return this.discount.startsAt ? false : true;
    },

    enableFromDate() {
      return this.selectedDiscountId === "";
    },

    startsAtClass() {
      let customClass =
        "w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-sky-500";
      if (this.$v.discount.startsAt.$error) {
        customClass = customClass.concat(" ", "border-red-600");
      } else if (
        this.$v.discount.startsAt.$dirty &&
        !this.$v.discount.startsAt.$error
      ) {
        customClass = customClass.concat(" ", "border-green-600");
      }
      return customClass;
    },

    endsAtClass() {
      let customClass =
        "w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-sky-500";
      if (this.$v.discount.endsAt.$error) {
        customClass = customClass.concat(" ", "border-red-600");
      } else if (
        this.$v.discount.endsAt.$dirty &&
        !this.$v.discount.endsAt.$error
      ) {
        customClass = customClass.concat(" ", "border-green-600");
      }
      return customClass;
    },

    isDiscountSelected() {
      return this.discountId ? true : false;
    },

    canRestore() {
      return this.discount.deletedAt !== null;
    },

    canDelete() {
      return this.discount.deletedAt !== null;
    },
  },
  data() {
    return {
      confirmModalState: false,
      waiting: false,
      discount: {
        code: "",
        value: "",
        startsAt: "",
        endsAt: "",
        deletedAt: null,
      },
    };
  },
  validations: {
    discount: {
      code: {
        required,
        alphaNum,
        maxLength: maxLength(25),
      },
      value: {
        required,
        integer,
        minValue: minValue(1),
      },
      startsAt: {
        required,
      },
      endsAt: {
        required,
      },
    },
  },
  watch: {
    discountId: function (value) {
      if (value) {
        this.discount = JSON.parse(
          JSON.stringify(_find(this.getDiscounts, ["id", value]))
        );
      }
    },
  },
  methods: {
    ...mapActions("Notification", ["openNotification"]),
    ...mapActions("Discounts", [
      "postDiscount",
      "patchDiscount",
      "disableDiscount",
      "deleteDiscount",
      "restoreDiscount",
    ]),

    disableDatesInterval(date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return date < today;
    },

    disableBeforeFromDate(date) {
      return date < new Date(this.discount.startsAt);
    },

    toggleConfirmModal() {
      this.confirmModalState = !this.confirmModalState;
    },

    async submit() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        await this.postDiscount(this.discount);
        this.resetForm();
      }
    },

    async callPatchDiscount() {
      this.waiting = true;
      const originalDiscount = _find(this.getDiscounts, [
        "id",
        this.discount.id,
      ]);

      const payload = {
        vm: this,
        discount: {},
      };

      let counter = 0;

      Object.keys(this.discount).forEach((key) => {
        if (this.discount[key] !== originalDiscount[key]) {
          payload.discount[key] = this.discount[key];
          counter++;
        }
      });

      if (counter > 0) {
        payload.discount.id = this.discount.id;
        await this.patchDiscount(payload);

        this.openNotification({
          type: "ok",
          show: true,
          message: "Discount updated",
        });
      } else {
        this.openNotification({
          type: "info",
          show: true,
          message: "Nothing to update",
        });
      }

      this.waiting = false;
    },

    async callDisableDiscount() {
      try {
        this.waiting = true;

        const payload = {
          id: this.discount.id,
          vm: this,
        };

        const deletedAt = await this.disableDiscount(payload);
        this.discount.deletedAt = deletedAt;

        this.openNotification({
          type: "ok",
          show: true,
          message: "Discount disabled",
        });

        this.waiting = false;
      } catch (error) {
        this.waiting = false;
        console.log(error);
      }
    },

    async callRestoreDiscount() {
      try {
        this.waiting = true;

        const payload = {
          id: this.discount.id,
          vm: this,
        };

        await this.restoreDiscount(payload);
        this.discount.deletedAt = null;

        this.openNotification({
          type: "ok",
          show: true,
          message: "Discount restored",
        });

        this.waiting = false;
      } catch (error) {
        this.waiting = false;
        console.log(error);
      }
    },

    async callDeleteDiscount() {
      try {
        this.waiting = true;

        this.toggleConfirmModal();

        await this.deleteDiscount(this.discount.id);

        this.resetForm();

        this.openNotification({
          type: "ok",
          show: true,
          message: "Discount permanently removed",
        });

        this.waiting = false;
      } catch (error) {
        this.waiting = false;
        console.log(error);
      }
    },

    resetForm() {
      this.$v.discount.$reset();
      this.discount = {
        code: "",
        value: "",
        startsAt: "",
        endsAt: "",
        deletedAt: null,
      };
      this.$emit("reset");
    },
  },
  components: {
    Input,
    InputGroup,
    Button,
    DatePicker,
    ConfirmActionModal,
  },
};
</script>


<style>
  .mx-datepicker {
    width: 100%;
  }
</style>