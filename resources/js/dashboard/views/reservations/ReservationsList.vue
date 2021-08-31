<template>
  <view-container>
    <reservations-filter
      :filterData="filterData"
      v-if="showFilterState"
      @closed="toggleFilterState"
      @
      @filter="filter"
    >
    </reservations-filter>

    <template slot="header"> Reservations List </template>

    <div class="flex flex-col pb-3 md:flex-row md:justify-between items-end">
      <div class="w-full md:flex md:flex-row md:gap-3 md:items-center">
        <button
          class="
            w-full
            py-1
            text-base text-white
            ripple-bg-green-600
            rounded-sm
            active:shadow-inner
            md:w-20
          "
          @click="toggleFilterState"
        >
          Filter
        </button>
        <button
          class="
            w-full
            py-1
            mt-2
            text-base text-white
            ripple-bg-sky-600
            rounded-sm
            active:shadow-inner
            md:w-20
            md:mt-0
          "
          @click="refresh"
        >
          Refresh
        </button>
        <router-link
          :to="{ name: 'ReservationCreate' }"
          class="
            block
            w-full
            py-1
            px-2
            mt-2
            text-center text-base text-white
            ripple-bg-orange-600
            rounded-sm
            active:bg-orange-500
            md:w-auto
            md:mt-0
          "
        >
          Create reservation
        </router-link>
      </div>

      <select
        v-model="orderBy"
        class="
          w-full
          p-1
          mt-2
          text-base
          border-gray-300 border
          rounded-sm
          md:w-auto
        "
        @change="order"
      >
        <option value="1">Order by created at asc</option>
        <option value="2">Order by created at desc</option>
      </select>
    </div>
    <cards-list v-if="isLoaded">
      <reservation-card
        v-for="reservation in reservations"
        :key="reservation.id"
        :reservation="reservation"
      ></reservation-card>
    </cards-list>

    <div v-else class="w-full h-full flex items-center justify-center">
      <spinner
        :size="90"
        :spacing="24"
        :line-size="7"
        :font-size="20"
        line-fg-color="#0084C7"
      ></spinner>
    </div>

    <pagination
      :data="pagination"
      :query="query"
      route="Reservations"
      @navigate="callDownloadReservations"
    ></pagination>
  </view-container>
</template>

<script>
import ViewContainer from "../ViewContainer.vue";
import CardsList from "../../components/cards/CardsListComponent.vue";

import { downloadReservations } from "../../api/reservations.api.js";
import ReservationCard from "../../components/reservations/ReservationCard.vue";
import Pagination from "../../components/PaginationComponent.vue";
import ReservationsFilter from "../../components/filter/ReservationsFilter.vue";

import Spinner from "vue-simple-spinner";

import _isEqual from "lodash/isEqual";
import _isEmpty from "lodash/isEmpty";

export default {
  async beforeRouteEnter(to, from, next) {
    let response = {};
    if (Object.keys(to.query).length === 0) {
      response = await downloadReservations();
    } else {
      response = await downloadReservations(to.query);
    }
    next((vm) => vm.setData(response));
  },

  mounted() {
    Object.keys(this.$route.query).forEach((key) => {
      if (!_isEmpty(this.$route.query[key])) {
        this.filterData[key] = this.$route.query[key];
      }
    });
  },

  computed: {
    query() {
      const query = {};

      Object.keys(this.filterData).forEach((key) => {
        if (this.filterData[key] !== "") {
          query[key] = this.filterData[key];
        }
      });

      return query;
    },
  },

  data() {
    return {
      isLoaded: false,

      reservations: [],

      filterData: {
        id: "",
        phoneNumber: "",
        email: "",
        beginsAt: "",
      },

      showFilterState: false,
      orderBy: 2,

      pagination: {
        currentPage: "",
        lastPage: "",
      },
    };
  },

  methods: {
    async callDownloadReservations(query) {
      try {
        this.isLoaded = false;

        const response = await downloadReservations(query);
        this.setData(response);

        this.isLoaded = true;
      } catch (error) {
        console.log(error);
      }
    },

    async refresh() {
      if (Object.keys(this.$route.query).length > 0) {
        this.$router.replace({ name: "Reservations", query: {} });
      }

      this.orderBy = 2;

      this.resetFilterData();

      const response = await downloadReservations();

      this.setData(response);
    },

    async order() {
      try {
        const query = {};

        Object.keys(this.filterData).forEach((key) => {
          if (!_isEmpty(this.filterData[key])) {
            query[key] = this.filterData[key];
          }
        });

        query.orderBy = this.orderBy;

        const response = await downloadReservations(query);
        this.setReservations(response.data.data.reservations);

        if (!_isEqual(this.$route.query, query)) {
          this.$router.replace({ name: "Reservations", query });
        }
      } catch (error) {
        console.log(error);
      }
    },

    async filter(query) {
      if (!_isEqual(this.filterData, query)) {
        query.orderBy = this.orderBy;
        query.page = 1;

        const response = await downloadReservations(query);

        this.setData(response);

        this.$router.replace({ name: "Reservations", query });

        this.updateFilterData(query);
      }
    },

    updateFilterData(filterData) {
      Object.keys(filterData).forEach((key) => {
        if (!_isEmpty(filterData[key])) {
          this.filterData[key] = filterData[key];
        }
      });
    },

    toggleFilterState() {
      this.showFilterState = !this.showFilterState;
    },

    setData(data) {
      this.setReservations(data.data.data.reservations);
      this.setPagination(data.data.meta);
      this.isLoaded = true;
    },

    setReservations(reservations) {
      this.reservations = reservations;
    },

    setPagination(meta) {
      this.pagination.currentPage = meta.current_page;
      this.pagination.lastPage = meta.last_page;
    },

    resetFilterData() {
      Object.keys(this.filterData).forEach((key) => {
        this.filterData[key] = "";
      });
    },
  },

  components: {
    ViewContainer,
    CardsList,
    ReservationCard,
    Pagination,
    Spinner,
    ReservationsFilter,
  },
};
</script>
