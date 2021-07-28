<template>
  <view-container>
    <template slot="header"> Reservation #{{ reservation.id }}</template>

    <div class="text-sm md:flex md:gap-x-4 lg:w-2/3 2xl:w-1/2">
      <div class="w-full bg-white shadow p-4 rounded md:flex-1">
        <div class="flex items-center justify-between">
          <div>
            <span class="font-semibold">Client</span>
            <span>{{ reservation.clientName }}</span>
          </div>
          <reservation-status
            :status-name="reservation.status.name"
            v-if="reservation.status.name"
          ></reservation-status>
        </div>
        <div class="flex items-center justify-between mt-2">
          <div>
            <span class="font-semibold">Staff</span>
            <span v-if="reservation.staffName">{{
              reservation.staffName
            }}</span>
            <span v-else class="italic">null</span>
          </div>
          <div>
            <span>{{ reservation.seats }}</span>
            <span class="font-semibold">seats</span>
          </div>
        </div>
      </div>

      <div class="mt-4 md:flex-1 md:mt-0">
        <div class="w-full bg-white shadow p-4 rounded">
          <div>
            <span class="font-semibold">Created at</span>
            <span>{{ reservation.createdAt | formatDate }}</span>
          </div>
          <div class="mt-2">
            <span class="font-semibold">Begins at</span>
            <span>{{ reservation.beginsAt | formatDate }}</span>
          </div>
        </div>

        <div class="w-full bg-white shadow p-4 rounded mt-4">
          <div class="font-bold">Tables</div>
          <ul class="pr-2">
            <li
              v-for="table in reservation.tables"
              :key="table.id"
              class="pl-2 mt-1"
            >
              <span class="font-semibold">{{ table.name }}</span>
              <span>{{ table.seats }} seats</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="w-full bg-white shadow p-4 rounded mt-4 lg:w-2/3 2xl:w-1/2">
      <div class="flex items center justify-between hover:cursor-pointer">
        <div class="font-bold">Orders</div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
          >
            <path d="M24 24H0V0h24v24z" fill="none" opacity=".87" />
            <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" />
          </svg>
          <!-- <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
								<path d="M0 0h24v24H0V0z" fill="none" />
								<path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14l-6-6z" />
							</svg> -->
        </div>
      </div>
    </div>

    <div class="mt-4 flex items-center gap-x-2 md:flex-row-reverse lg:flex-row">
      <select-component class="w-full md:w-auto">
        <option value="" selected disabled>Select status</option>
      </select-component>

      <button-component
        v-if="canCancel"
        type="danger"
        class="mt-2 md:mt-0"
        @click.native="callCancelReservation"
      >
        Cancel
      </button-component>
    </div>
  </view-container>
</template>

<script>
import ViewContainer from "../ViewContainer.vue";

import ButtonComponent from "../../components/buttons/ButtonComponent.vue";
import SelectComponent from "../../components/inputs/SelectInputComponent.vue";
import ReservationStatus from "../../components/reservations/ReservationStatus.vue";

import {
  downloadReservation,
  disableReservation,
} from "../../api/reservations.api";

export default {
  async beforeRouteEnter(to, from, next) {
    const response = await downloadReservation(to.params.id);

    next((vm) => vm.setData(response));
  },

  computed: {
    canCancel() {
      return !this.reservation.deletedAt;
    },
  },

  data() {
    return {
      reservationStatus: "",

      reservation: {
        id: "",
        clientName: "",
        staffName: "",
        seats: [],
        tables: [],
        createdAt: "",
        deletedAt: "",
        beginsAt: "",
        status: "",
      },
    };
  },

  methods: {
    async callCancelReservation() {
      try {
        this.$Progress.start();

        const response = await disableReservation(this.reservation.id);

        this.reservation.deletedAt = response.data.deletedAt;
        this.$set(this.reservation, "status", response.data.status);

        this.$Progress.start();
        this.$toast.success(response.data.message);
      } catch (error) {
        this.$Progress.fail();

        if (error.response) {
          this.$toast.error(error.response.data.message);
        } else {
          this.$toast.error("Something went wrong, try again later");
        }

        console.log(error);
      }
    },

    async callUpdateReservationStatus() {
      try {
        this.$Progress.start();

        this.$Progress.start();
        // this.$toast.success(response.data.message);
      } catch (error) {
        this.$Progress.fail();

        if (error.response) {
          this.$toast.error(error.response.data.message);
        } else {
          this.$toast.error("Something went wrong, try again later");
        }

        console.log(error);
      }
    },

    setData(response) {
      this.reservation = response.data.data;
    },
  },

  components: {
    ViewContainer,
    ButtonComponent,
    SelectComponent,
    ReservationStatus,
  },
};
</script>
