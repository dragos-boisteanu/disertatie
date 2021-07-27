<template>
	<view-container>
		<template slot="header"> Reservations List </template>

		<cards-list>
			<reservation-card
				v-for="reservation in reservations"
				:key="reservation.id"
				:reservation="reservation"
			></reservation-card>
		</cards-list>
	</view-container>
</template>

<script>
import ViewContainer from "../ViewContainer.vue";
import CardsList from "../../components/cards/CardsListComponent.vue";

import { downloadReservations } from "../../api/reservations.api.js";
import ReservationCard from "../../components/reservations/ReservationCard.vue";

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

	data() {
		return {
			reservations: [],
			pagination: {
				currentPage: "",
				lastPage: "",
			},
		};
	},

	methods: {
		setData(data) {
			this.setReservations(data.data.data.reservations);
			this.setPagination(data.data.meta);
		},

		setReservations(reservations) {
			this.reservations = reservations;
		},

		setPagination(meta) {
			this.pagination.currentPage = meta.current_page;
			this.pagination.lastPage = meta.last_page;
		},
	},

	components: {
		ViewContainer,
		CardsList,
		ReservationCard,
	},
};
</script>
