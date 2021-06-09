<template>
  <ViewContainer>
    <ConfirmTableDeleteModal
      v-if="showDeleteteConfirmationModal"
      :table-id="table.id"
      @delete="callDeleteTable"
      @closed="toggleModal"
    ></ConfirmTableDeleteModal>

    <template slot="header"> Tables </template>

    <div class="w-full md:flex md:gap-x-4 xl:w-3/4 2xl:w-1/2">
      <div class="flex flex-col bg-white shadow rounded-sm p-5 md:flex-1">
        <table class="px-2 w-full rounded-sm max-h-80 md:max-h-96">
          <thead class="w-full bg-gray-700 text-orange-500">
            <tr class="text-left text-sm">
              <th class="p-2 text-center">Index</th>
              <th class="p-2">Name</th>
              <th class="p-2">Status</th>
            </tr>
          </thead>
          <tbody class="overflow-y-auto">
            <tr
              v-for="(table, index) in getTables"
              :key="table.id"
              @click="selectTable(table.id)"
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
              <td class="p-2">{{ table.name }}</td>
              <td class="p-2">{{ table.status.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>

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
              <TextInput v-model="table.name" id="name" name="name"></TextInput>
            </InputGroup>
          </div>
          <div class="flex flex-wrap items-center gap-4">
            <div v-if="isTableSelected" class="w-full flex items-center gap-4">
              <Button type="secondary" @click.native="resetForm">
                Clear selection
              </Button>

              <div v-if="canDelete && canRestore" class="flex items-center gap-2">
                <Button type="danger" @click.native="toggleModal">
                  Delete
                </Button>

                <Button @click.native="callRestoreTable"> Restore </Button>
              </div>

              <Button v-else @click.native="callDisableTable"> Disable </Button>
            </div>

            <Button type="primary" @click.native="submitNewTable">
              <span v-if="isTableSelected"> Update </span>
              <span v-else> Submit </span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  </ViewContainer>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import ViewContainer from "../ViewContainer";

import ConfirmTableDeleteModal from "../../components/modals/ConfirmTableDeleteModalComponent";

import InputGroup from "../../components/inputs/InputGroupComponent";
import TextInput from "../../components/inputs/TextInputComponent";
import Button from "../../components/buttons/ButtonComponent";

import _find from "lodash/find";

export default {
  computed: {
    ...mapGetters("Tables", ["getTables"]),

    isTableSelected() {
      return this.table.id ? true : false;
    },

    canDelete() {
      return this.table.status.name === "Disabled";
    },

    canRestore() {
      return this.table.status.name === "Disabled";
    },

    showDeleteteConfirmationModal() {
      return this.isTableSelected && this.showDeleteModalState;
    },
  },

  data() {
    return {
      showDeleteModalState: false,

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

  methods: {
    ...mapActions("Tables", ["disableTable", "restoreTable", "deleteTable"]),

    async submitNewTable() {
      console.log(`new table with name ${this.table.name} was created`);
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

    async callDeleteTable(tableId) {
      await this.deleteTable(tableId);
      this.toggleModal();
      this.resetForm();
    },

    selectTable(tableId) {
      this.table = JSON.parse(
        JSON.stringify(_find(this.getTables, ["id", tableId]))
      );
    },

    toggleModal() {
      this.showDeleteModalState = !this.showDeleteModalState;
    },

    resetForm() {
      this.table.id = "";
      this.table.name = "";
    },
  },

  components: {
    ViewContainer,
    ConfirmTableDeleteModal,
    InputGroup,
    TextInput,
    Button,
  },
};
</script>