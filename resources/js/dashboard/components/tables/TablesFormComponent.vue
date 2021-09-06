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
        <div>
          <InputGroup id="name" label="Name" class="w-full">
            <TextInput
              v-model="table.name"
              :waiting="waiting"
              :disabled="isTableSelected || waiting"
              id="name"
              name="name"
            ></TextInput>
          </InputGroup>
          <InputGroup id="name" label="Seats" class="w-full">
            <TextInput
              v-model="table.seats"
              :waiting="waiting"
              :disabled="isTableSelected || waiting"
              id="seats"
              name="seats"
            ></TextInput>
          </InputGroup>
        </div>
      </div>
      <div class="flex flex-wrap items-center gap-4">
        <div v-if="tableId" class="w-full flex items-center gap-4">
          <Button
            type="secondary"
            @click.native="resetForm"
            :waiting="waiting"
            :disabled="waiting"
          >
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
            <Button @click.native="callRestoreTable" :disabled="waiting">
              Restore
            </Button>
          </div>

          <Button v-else @click.native="callDisableTable" :disabled="waiting">
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

import { alphaNumSpaces } from "../../validators/index";
import { required, integer, minValue } from "vuelidate/lib/validators";

import _find from "lodash/find";

import { mapGetters, mapActions } from "vuex";

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
        seats: "",
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
      },
      seats: {
        required,
        integer,
        minValue: minValue(0),
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
        try {
          this.$Progress.start();

          const response = await this.storeTable(this.table);
          // this.table.id = response.table.id;
          // this.table.status = response.table.status;
          this.resetForm();
          this.$v.$reset();
          this.$Progress.finish();
          this.$toast.success(response.data.message);
        } catch (error) {
          this.$Progress.fail();
          if (error.response && error.response.data) {
            this.$toast.error(error.response.data.message);
          } else {
            this.$toast.error(error.response.data.message);
          }
        }
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