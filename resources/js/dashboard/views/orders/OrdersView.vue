<template>
  <ViewContainer>
    <OrdersFilter
      :filterData="filterData"
      v-if="showFilterState"
      @closed="toggleFilterState"
      @filter="filter"
    />

    <template slot="header"> Orders </template>

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
          @click="refresh"
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
        >
          Refresh
        </button>
        <router-link
          :to="{ name: 'CreateOrder' }"
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
          Create order
        </router-link>
        <button
          class="
            flex
            items-center
            justify-center
            gap-x-4
            w-full
            px-4
            py-1
            mt-2
            text-base text-white
            ripple-bg-sky-600
            rounded-sm
            active:shadow-inner
            md:w-60
            md:mt-0
          "
          @click="toggleSubscribedToNewOrders"
        >
          <div class="flex items-center justify-center w-4 h-4 bg-white border">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="12px"
              viewBox="0 0 24 24"
              width="12px"
              fill="#000000"
              v-if="getSubscribedToNewOrders"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
            </svg>
          </div>
          <div>Subscribe to new orders</div>
        </button>
        <input hidden type="checkbox" :checked="getSubscribedToNewOrders" />
      </div>

      <select
        v-model="orderBy"
        @change="order"
        class="
          w-full
          p-1
          mt-2
          text-base
          border-gray-300 border
          rounded-sm
          md:w-auto
        "
      >
        <option :value="1">Created at asc</option>
        <option :value="2">Created at desc</option>
      </select>
    </div>
    <CardsList>
      <Card v-for="order in orders" :key="order.id">
        <OrderCardContent :order="order"></OrderCardContent>
      </Card>
    </CardsList>

    <Pagination
      :data="pagination"
      :query="query"
      route="Orders"
      @navigate="callDownloadOrders"
    ></Pagination>
  </ViewContainer>
</template>

<script>
import ViewContainer from "../ViewContainer";

import CardsList from "../../components/cards/CardsListComponent";
import Card from "../../components/cards/CardComponent";
import OrderCardContent from "../../components/orders/OrderCardContentComponent";

import OrdersFilter from "../../components/filter/OrdersFilterComponent";
import Pagination from "../../components/PaginationComponent";

import _findIndex from "lodash/findIndex";

import _isEqual from "lodash/isEqual";
import _isEmpty from "lodash/isEmpty";

import { downloadOrders } from "../../api/orders.api";
import { mapActions, mapGetters } from "vuex";

export default {
  async beforeRouteEnter(to, from, next) {
    let response = {};
    if (Object.keys(to.query).length === 0) {
      response = await downloadOrders();
    } else {
      response = await downloadOrders(to.query);
    }

    next((vm) => vm.setData(response.data));
  },

  mounted() {
    Object.keys(this.$route.query).forEach((key) => {
      if (!_isEmpty(this.$route.query[key])) {
        this.filterData[key] = this.$route.query[key];
      }     
    });

     if (!_isEmpty(this.$route.query.statuses)) {
      this.filterData.statuses = [];
      this.filterData.statuses.push(...this.$route.query.statuses);
    }

    if (!_isEmpty(this.$route.query.deliveryMethods)) {
      this.filterData.deliveryMethods = [];
      this.filterData.deliveryMethods.push(...this.$route.query.deliveryMethods);
    }

    if (this.getSubscribedToNewOrders) {
      this.subscribeToNewOrders();
    } else {
      this.unsubscribeFromNewOrders();
    }
  },

  computed: {
    ...mapGetters("Users", ["getSubscribedToNewOrders"]),

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
      orders: [],
      filterData: {
        id: "",
        phoneNumber: "",
        staffFirstName: "",
        staffLastName: "",
        statuses: [],
        deliveryMethods: []
      },
      pagination: {
        currentPage: "",
        lastPage: "",
      },
      orderBy: 2,
      showFilterState: false,

      subscribe: false,
    };
  },

  watch: {
    getSubscribedToNewOrders(newValue) {
      if (newValue) {
        this.subscribeToNewOrders();
      } else {
        this.unsubscribeFromNewOrders();
      }
    },
  },

  methods: {
    ...mapActions("Notification", ["openNotification"]),
    ...mapActions("Users", ["toggleSubscribedToNewOrders"]),

    async refresh() {
      if (Object.keys(this.$route.query).length > 0) {
        this.$router.replace({ name: "Orders", query: {} });
      }

      this.orderBy = 2;

      this.resetFilterData();

      const response = await downloadOrders();

      this.setData(response.data);
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

        const response = await downloadOrders(query);
        this.setOrders(response.data.data);

        if (!_isEqual(this.$route.query, query)) {
          console.log(query);
          this.$router.replace({ name: "Orders", query });
        }
      } catch (error) {
        console.log(error);
      }
    },

    async filter(query) {
      if (!_isEqual(this.filterData, query)) {
        query.orderBy = this.orderBy;
        query.page = 1;

        const response = await downloadOrders(query);
        this.setData(response.data);

        this.$router.replace({ name: "Orders", query });

        this.updateFilterData(query);
      }
    },

    async callDownloadOrders(query) {
      const response = await downloadOrders(query);
      this.setData(response.data);
    },

    setData(data) {
      this.setOrders(data.data);
      this.setPagination(data.meta);
    },

    setOrders(orders) {
      this.orders = orders;
    },

    setPagination(pagination) {
      this.pagination.currentPage = pagination.current_page;
      this.pagination.lastPage = pagination.last_page;
    },

    toggleFilterState() {
      this.showFilterState = !this.showFilterState;
    },

    resetFilterData() {
      Object.keys(this.filterData).forEach((key) => {
        this.filterData[key] = "";
      });
    },

    updateFilterData(filterData) {
      Object.keys(filterData).forEach((key) => {
        if (!_isEmpty(filterData[key])) {
          this.filterData[key] = filterData[key];
        }
      });

      if (!_isEmpty(filterData.statuses)) {
        this.filterData.statuses = [];
        this.filterData.statuses.push(...filterData.statuses);
      }

      if (!_isEmpty(filterData.deliveryMethods)) {
        this.filterData.deliveryMethods = [];
        this.filterData.deliveryMethods.push(...filterData.deliveryMethods);
      }
    },

    // toggleSubscribeState() {
    //   this.subscribe = !this.subscribe;
    // },

    subscribeToNewOrders() {
      Echo.private("orders").listen("OrderCreated", (e) => {
        const newOrder = e.order;
        if (this.orders) {
          this.orders.unshift(newOrder);
        }

        this.openNotification({
          type: "info",
          message: `New order was created with id #${newOrder.id}`,
          show: true,
        });
      });
    },

    unsubscribeFromNewOrders() {
      Echo.leave("orders");
    },
  },

  components: {
    ViewContainer,
    Card,
    CardsList,
    OrdersFilter,
    Pagination,
    OrderCardContent,
  },
};
</script>