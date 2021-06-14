<template>
  <div class="mt-4 md:mt-0 lg:flex-1">
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
        <InputGroup id="name" label="Name" class="w-full">
          <TextInput v-model="table.name" :disabled="isTableSelected" id="name" name="name"></TextInput>
        </InputGroup>
      </div>
      <div class="flex flex-wrap items-center gap-4">
        <div v-if="tableId" class="w-full flex items-center gap-4">
          <Button type="secondary" @click.native="resetForm">
            Clear selection
          </Button>

          <div v-if="canDelete && canRestore" class="flex items-center gap-2">
            <Button type="danger" @click.native="toggleModal"> Delete </Button>

            <Button @click.native="callRestoreTable"> Restore </Button>
          </div>

          <Button v-else @click.native="callDisableTable"> Disable </Button>
        </div>

        <!-- <Button v-if="tableId" type="primary"> Update </Button> -->
        <Button v-if="!isTableSelected" type="primary" @click.native="createNewTable">
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

  watch: {
    tableId: function () {
      if (this.tableId) {
        this.table = JSON.parse(
          JSON.stringify(_find(this.getTables, ["id", this.tableId]))
        );
      }
    },
  },

  methods: {
    ...mapActions("Tables", [
      "storeTable",
      "disableTable",
      "restoreTable",
    ]),

    async createNewTable() {
      const table = await this.storeTable(this.table.name);
      this.table.id = table.id;
      this.table.status = table.status;
      this.resetForm();
    },

    async callDisableTable() {
      const payload = {
        vm: this,
        id: this.table.id,
      };
      const status = await this.disableTable(payload);
      Object.keys(status).forEach((key) => {
        this.$set(this.table.status, key, status[key]);
      });
    },

    async callRestoreTable() {
      const payload = {
        vm: this,
        id: this.table.id,
      };
      const status = await this.restoreTable(payload);
      Object.keys(status).forEach((key) => {
        this.$set(this.table.status, key, status[key]);
      });
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

    toggleModal() {
      this.$emit("toggleDeleteModal");
    },
  },

  components: {
    InputGroup,
    TextInput,
    Button,
  },
};
</script>