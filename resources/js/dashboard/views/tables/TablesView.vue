<template>
  <ViewContainer>
    <ConfirmTableDeleteModal
      v-if="showDeleteteConfirmationModal"
      :table-id="table.id"
      @delete="callDeleteTable"
      @closed="toggleModal"
    ></ConfirmTableDeleteModal>

    <template slot="header">
      <div class="flex items-center justify-between md:justify-start gap-x-4">
        <span> Tables </span>
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
        <TablesList :tables="getTables" @selected="selectTable"></TablesList>
      </div>

      <TablesForm
        :table-id="tableId"
        @clearSelection="clearSelection"
        @toggleDeleteModal="toggleModal"
      ></TablesForm>
    </div>
  </ViewContainer>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import ViewContainer from "../ViewContainer";

import TablesList from "../../components/tables/TablesListComponent.vue";
import TablesForm from "../../components/tables/TablesFormComponent";

import ConfirmTableDeleteModal from "../../components/modals/ConfirmTableDeleteModalComponent";

import InputGroup from "../../components/inputs/InputGroupComponent";
import TextInput from "../../components/inputs/TextInputComponent";
import Button from "../../components/buttons/ButtonComponent";

import _find from "lodash/find";

export default {
  computed: {
    ...mapGetters("Tables", ["getTables"]),

    showDeleteteConfirmationModal() {
      return this.showDeleteModalState;
    },
  },

  data() {
    return {
      showDeleteModalState: false,
      tableId: null,
    };
  },

  methods: {
    ...mapActions("Tables", ["downloadTables", "deleteTable"]),

    async callDeleteTable(tableId) {
      await this.deleteTable(tableId);
      this.toggleModal();
      this.resetForm();
    },

    async refresh() {
      await this.downloadTables();
    },

    clearSelection() {
      this.tableId = null;
    },

    selectTable(tableId) {
      this.tableId = tableId;
    },

    toggleModal() {
      this.showDeleteModalState = !this.showDeleteModalState;
    },
  },

  components: {
    ViewContainer,
    ConfirmTableDeleteModal,
    InputGroup,
    TextInput,
    Button,
    TablesList,
    TablesForm,
  },
};
</script>