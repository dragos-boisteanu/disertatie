<template>
  <div class="mt-4 md:mt-0 lg:flex-1">
    <ConfirmActionModal
      v-if="confirmModalState"
      title="Confirm action"
      mainMessage="Are you sure you want to delete the selected table ?"
      @cancel="toggleConfirmModal"
      @ok="callDeleteTable"
    ></ConfirmActionModal>
    <form
      class="
        flex flex-col
        items-stretch
        justify-items-start
        gap-y-3
        md:flex-auto
      "
    >
      <div class="flex flex-col gap-y-3 bg-white shadow rounded-sm p-5">
        <h2 class="mb-2 text-xl font-semibold">Table</h2>
        <InputGroup
          id="name"
          label="Name"
          class="w-full"
          :hasError="$v.table.name.$error"
        >
          <template v-slot:errors>
            <p v-if="!$v.table.name.required">The name field is required</p>
            <p v-if="!$v.table.name.maxLength">
              The name field must be no longer than 25 characters
            </p>
            <p v-if="!$v.table.name.alphaNumSpaces">
              The name field must contain only letters, numbers or spaces
            </p>
          </template>
          <TextInput
            v-model="$v.table.name.$model"
            :waiting="waiting"
            :disabled="isTableSelected || waiting"
            :eclass="{
              'border-red-600': $v.table.name.$error,
              'border-green-600': $v.table.name.$dirty && !$v.table.name.$error,
            }"
            id="name"
            name="name"
          ></TextInput>
        </InputGroup>
      </div>
      <div class="flex flex-wrap items-center gap-4">
        <div v-if="tableId" class="w-full flex items-center gap-4">
          <Button type="secondary" @click.native="resetForm" :waiting="waiting" :disabled="waiting">
            Reset
          </Button>

          <div v-if="canDelete && canRestore" class="flex items-center gap-2">
            <Button
              type="danger"
              @click.native="toggleConfirmModal"
              :disabled="waiting"
            >
              Delete
            </Button>
            <Button
              @click.native="callRestoreTable"
              :disabled="waiting"
            >
              Restore
            </Button>
          </div>

          <Button
            v-else
            @click.native="callDisableTable"
            :disabled="waiting"
          >
            Disable
          </Button>
        </div>

        <Button
          v-if="!isTableSelected"
          type="primary"
          @click.native="createNewTable"
          :disabled="waiting"
        >
          Submit
        </Button>
      </div>
    </form>
  </div>
</template>

<script>
import InputGroup from "../../components/inputs/InputGroupComponent";
import TextInput from "../../components/inputs/TextInputComponent";
import Button from "../../components/buttons/ButtonComponent";

import ConfirmActionModal from "../modals/ConfirmActionModalComponent.vue";

import _find from "lodash/find";

import { mapGetters, mapActions } from "vuex";
import { required, maxLength } from "vuelidate/lib/validators";
import { alphaNumSpaces } from "../../validators/index";

export default {
  props: {
    tableId: {
      type: [Number, String],
      required: false,
      default: null,
    },
  },

  computed: {
    ...mapGetters("Tables", ["getTables"]),

    isTableSelected() {
      return this.tableId ? true : false;
    },

    canDelete() {
      return this.tableId && this.table.status.name === "Disabled";
    },
    canRestore() {
      return this.tableId && this.table.status.name === "Disabled";
    },
  },

  data() {
    return {
      waiting: false,
      confirmModalState: false,
      table: {
        id: "",
        name: "",
        status: {
          id: "",
          name: "",
        },
      },
    };
  },

  validations: {
    table: {
      name: {
        required,
        alphaNumSpaces,
        maxLength: maxLength(25),
      },
    },
  },

  watch: {
    tableId: function () {
      if (this.tableId) {
        this.table = JSON.parse(
          JSON.stringify(_find(this.getTables, ["id", this.tableId]))
        );
      } else {
        this.resetForm();
      }
    },
  },

  methods: {
    ...mapActions("Tables", [
      "storeTable",
      "disableTable",
      "restoreTable",
      "deleteTable",
    ]),

    async createNewTable() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        const table = await this.storeTable(this.table.name);
        this.table.id = table.id;
        this.table.status = table.status;
        this.resetForm();
        this.$v.$reset();
      }
    },

    async callDisableTable() {
      this.waiting = true;
      const payload = {
        vm: this,
        id: this.table.id,
      };
      const status = await this.disableTable(payload);
      Object.keys(status).forEach((key) => {
        this.$set(this.table.status, key, status[key]);
      });
      this.waiting = false;
    },

    async callRestoreTable() {
      this.waiting = true;
      const payload = {
        vm: this,
        id: this.table.id,
      };
      const status = await this.restoreTable(payload);
      Object.keys(status).forEach((key) => {
        this.$set(this.table.status, key, status[key]);
      });
      this.waiting = false;
    },

    async callDeleteTable() {
      this.waiting = true;
      this.toggleConfirmModal();
      await this.deleteTable(this.tableId);
      this.waiting = false;
      this.resetForm();
    },

    resetForm() {
      this.table = {
        id: "",
        name: "",
        status: {
          id: "",
          name: "",
        },
      };
      this.$emit("clearSelection");
    },

    toggleConfirmModal() {
      this.confirmModalState = !this.confirmModalState;
    },
  },

  components: {
    InputGroup,
    TextInput,
    Button,
    ConfirmActionModal,
  },
};
</script>