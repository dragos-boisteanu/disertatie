<template>
	<card>
		<router-link :to="{ name: 'Reservation', params: { id: reservation.id } }" class="block">
			<div class="w-full flex items-center justify-between">
				<div class="text-lg text-trueGray-800 font-semibold">{{ reservation.id }}</div>
				<div class="text-xs py-1 px-2 rounded-sm font-semibold" :class="statusClass">{{ reservation.status.name }}</div>
			</div>
			<div class="my-2 w-full flex items-center justify-between">
				<div>{{ reservation.clientName }}</div>
				<div><span class="font-semibold">Placed at</span> {{ reservation.createdAt | formatDate }}</div>
			</div>
			<div class="w-full flex items-center justify-between">
				<div>{{ reservation.seats }} <span v-if="reservation.seats == 1">seat</span> <span v-else>seats</span></div>
				<div><span class="font-semibold">Created at</span> {{ reservation.beginsAt }}</div>
			</div>
		</router-link>
	</card>
</template>

<script>
import Card from "../cards/CardComponent.vue";

export default {
	props: {
		reservation: {
			type: Object,
			required: true,
		},
	},

	computed: {
		statusClass() {
			let result = "";

			switch (this.reservation.status.name) {
				case "Pending":
					result = "bg-orange-300 text-orange-800";
					break;
				case "Active":
					result = "bg-blue-300 text-blue-800";
					break;
				case "Completed":
					result = "bg-green-300 text-green-800";
					break;
				case "Canceled":
					result = "bg-red-200 text-red-800";
					break;
			}

			return result;
		},
	},

	components: {
		Card,
	},
};
</script>
