<template>
	<filter-component>
		<template slot="close">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="black"
				width="24px"
				height="24px"
				@click="close"
			>
				<path d="M0 0h24v24H0z" fill="none" />
				<path
					d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
				/>
			</svg>
		</template>

		<template slot="header"> Reservations filter </template>

		<div class="mt-5 px-3 flex flex-col gap-y-4">
			<input
				v-model.trim="localFilterData.id"
				id="id"
				name="id"
				type="text"
				class="w-full border-b-2 border-sky-600 p-2 text-sm rounded-sm outline-none focus:border-sky-500 focus:shadow"
				placeholder="Id"
				@change="callFilter"
			/>

			<input
				v-model.trim="localFilterData.phoneNumber"
				id="phoneNumber"
				name="phoneNumber"
				type="text"
				class="w-full border-b-2 border-sky-600 p-2 text-sm rounded-sm outline-none focus:border-sky-500 focus:shadow"
				placeholder="Phone number"
				@change="callFilter"
			/>

			<input
				v-model.trim.lazy="localFilterData.email"
				id="email"
				name="email"
				type="text"
				class="w-full border-b-2 border-sky-600 p-2 text-sm rounded-sm outline-none focus:border-sky-500 focus:shadow"
				placeholder="Email address"
				@change="callFilter"
			/>

			<date-picker
				v-model.trim.lazy="localFilterData.beginsAt"
				type="datetime"
				confirm-text="Ok"
				valueType="format"
				format="D-MM-YYYY HH:mm"
				placeholder="Beginning date"
				:time-picker-options="{ start: '10:00', step: '00:15', end: '21:00' }"
				:show-second="false"
				:show-minute="false"
				:disabled-date="disableBeforeToday"
				:confirm="true"
				@change="callFilter"
			></date-picker>

			<!-- <date-picker
				v-model.trim.lazy="localFilterData.endsAt"
				type="time"
				confirm-text="Ok"
				valueType="format"
				format="HH:mm"
				placeholder="Beginning time"
				:time-picker-options="{ start: '10:00', step: '00:15', end: '21:00' }"
				:show-second="false"
				:show-minute="false"
				:confirm="true"
				@change="callFilter"
			></date-picker> -->
		</div>
	</filter-component>
</template>

<script>
import FilterComponent from "./FilterComponent.vue";
import DatePicker from "vue2-datepicker";

import _isEmpty from "lodash/isEmpty";

export default {
	mounted() {
		const routerQuery = this.$route.query;

		Object.keys(routerQuery).forEach((key) => {
			this.filterData[key] = routerQuery[key];
		});
	},

	props: {
		filterData: {
			type: Object,
			required: true,
		},
	},

	data() {
		return {
			localFilterData: {
				id: this.filterData.id,
				phoneNumber: this.filterData.phoneNumber,
				email: this.filterData.email,
				beginsAt: this.filterData.beginsAt,
				endsAt: this.filterData.endsAt,
			},
		};
	},

	methods: {
		callFilter() {
			const query = {};

			Object.keys(this.localFilterData).forEach((key) => {
				if (!_isEmpty(this.localFilterData[key])) {
					query[key] = this.localFilterData[key];
				}
			});

			this.filter(query);
		},

		filter(query) {
			this.$emit("filter", query);
		},
		close() {
			this.$emit("closed");
		},

		disableBeforeToday(date) {
			const today = new Date();
			today.setHours(0, 0, 0, 0);

			return date <= today;
		},
	},

	components: {
		FilterComponent,
		DatePicker,
	},
};
</script>
