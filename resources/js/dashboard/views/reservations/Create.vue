<template>
	<ViewContainer>
		<template slot="header"> Create reservation </template>
		<form class="flex flex-col">
			<div class="flex flex-col lg:items-start lg:flex-row lg:gap-x-6 w-full lg:w-1/2 2xl:w-1/3">
				<div class="flex flex-col gap-y-3 bg-white shadow rounded-sm p-5 lg:flex-1">
					<div>
						<h2 class="mb-5 text-xl font-semibold">Client Data</h2>
						<div class="flex flex-col gap-4 md:flex md:flex-row md:items-center md:justify-between">
							<form-group :validator="$v.client.firstName" label="First name" :showSingleError="true" class="flex-1">
								<Input
									v-model="$v.client.firstName.$model"
									id="firstName"
									name="firstName"
									:class="{
										'border-red-600': $v.client.firstName.$error,
										'border-green-600': $v.client.firstName.$dirty && !$v.client.firstName.$error,
									}"
								/>
							</form-group>
							<form-group :validator="$v.client.lastName" label="Last name" attribute="Last name" class="flex-1">
								<Input
									v-model="$v.client.lastName.$model"
									id="lastName"
									name="lastName"
									:class="{
										'border-red-600': $v.client.lastName.$error,
										'border-green-600': $v.client.lastName.$dirty && !$v.client.lastName.$error,
									}"
								/>
							</form-group>
						</div>
						<div class="flex flex-col gap-4 mt-4 md:flex md:flex-row md:items-center md:justify-between">
							<form-group
								:validator="$v.client.phoneNumber"
								label="Phone number"
								attribute="Phone number"
								class="flex-1"
							>
								<Input
									v-model="$v.client.phoneNumber.$model"
									id="phoneNumber"
									name="phoneNumber"
									:class="{
										'border-red-600': $v.client.phoneNumber.$error,
										'border-green-600': $v.client.phoneNumber.$dirty && !$v.client.phoneNumber.$error,
									}"
									@blur.native="callCheckForUser"
								/>
							</form-group>
							<form-group :validator="$v.client.email" label="Email" attribute="Email address" class="flex-1">
								<Input
									v-model="$v.client.email.$model"
									id="email"
									name="email"
									:class="{
										'border-red-600': $v.client.email.$error,
										'border-green-600': $v.client.email.$dirty && !$v.client.email.$error,
									}"
								/>
							</form-group>
						</div>
					</div>
					<div class="mt-4">
						<h2 class="mb-5 text-xl font-semibold">Reservation details</h2>
						<div class="flex flex-col gap-y-4 md:flex md:flex-row md:items-center md:justify-between md:gap-x-4">
							<form-group
								:validator="$v.reservation.date"
								label="Reservation date"
								attribute="Reservation date"
								class="flex-1"
							>
								<date-picker
									v-model="$v.reservation.date.$model"
									type="date"
									confirm-text="Ok"
									valueType="format"
									format="D-MM-YYYY"
									:disabled-date="disableBeforeToday"
									:confirm="true"
									:input-class="{
										'mx-input': true,
										'!border-red-600': $v.reservation.date.$error,
										'!border-green-600': $v.reservation.date.$dirty && !$v.reservation.date.$error,
									}"
									@input="callCheckForAvailableTables"
								>
								</date-picker>
							</form-group>
							<form-group
								:validator="$v.reservation.time"
								label="Reservation time"
								attribute="Reservation time"
								class="flex-1"
							>
								<date-picker
									v-model="$v.reservation.time.$model"
									type="time"
									confirm-text="Ok"
									valueType="format"
									format="HH:mm"
									:time-picker-options="{ start: '10:00', step: '00:15', end: '21:00' }"
									:show-second="false"
									:show-minute="false"
									:confirm="true"
									:input-class="{
										'mx-input': true,
										'!border-red-600': $v.reservation.time.$error,
										'!border-green-600': $v.reservation.time.$dirty && !$v.reservation.time.$error,
									}"
									@input="callCheckForAvailableTables"
								>
								</date-picker>
							</form-group>
							<form-group
								:validator="$v.reservation.seats"
								label="Reservation Seats"
								attribute="Reservation Seats"
								class="flex-1"
							>
								<Input
									v-model="$v.reservation.seats.$model"
									id="seats"
									name="seats"
									:class="{
										'border-red-600': $v.reservation.seats.$error,
										'border-green-600': $v.reservation.seats.$dirty && !$v.reservation.seats.$error,
									}"
									@blur.native="callCheckForAvailableTables"
								/>
							</form-group>
						</div>
					</div>
				</div>
			</div>

			<div class="mt-5 flex md:justify-start">
				<Button type="primary" @click.native="submit">
					Submit
				</Button>
			</div>
		</form>
	</ViewContainer>
</template>

<script>
import ViewContainer from "../ViewContainer.vue";
import InputGroup from "../../components/inputs/InputGroupComponent.vue";
import Input from "../../components/inputs/TextInputComponent.vue";
import Button from "../../components/buttons/ButtonComponent.vue";

import DatePicker from "vue2-datepicker";

import { findUserByPhoneNumber, checkForAvailableTables, storeReservation } from "../../api/reservations.api";

import { required, email, maxLength, numeric } from "vuelidate/lib/validators";

import { alphaSpaces, phoneNumber } from "../../validators/index";

export default {
	created() {},

	data() {
		return {
			loaded: false,

			clientId: "",

			client: {
				firstName: "",
				lastName: "",
				phoneNumber: "",
				email: "",
			},

			reservation: {
				date: "",
				time: "",
				seats: "",
			},

			tablesAvailabilityMessage: {
				type: "",
				text: "",
			},
		};
	},

	validations: {
		client: {
			firstName: {
				required,
				maxLength: maxLength(50),
				alphaSpaces,
			},
			lastName: {
				required,
				maxLength: maxLength(50),
				alphaSpaces,
			},
			phoneNumber: {
				required,
			},
			email: {
				email,
			},
		},

		reservation: {
			date: {
				required,
			},
			time: {
				required,
			},
			seats: {
				required,
				numeric,
			},
		},
	},

	methods: {
		async submit() {
			this.$v.$touch();

			if (!this.$v.$invalid) {
				const payload = {
					firstName: this.client.firstName,
					lastName: this.client.lastName,
					phoneNumber: this.client.phoneNumber,
					email: this.client.email,

					date: this.reservation.date,
					time: this.reservation.time,
					seats: this.reservation.seats,
				};

				if (this.clientId) {
					payload.clientId = this.clientId;
				}

				try {
					this.$Progress.start();

					const response = await storeReservation(payload);

					this.$Progress.finish();
					this.$toast.success(response.data.message);

					this.$router.replace({ name: "Reservations" });
				} catch (error) {
					this.$Progress.fail();

					if (error.response) {
						this.toast.error(error.response.data.message);
					} else {
						console.log(error);
						this.$toast.error("Something went wrong, try again later");
					}
				}
			}
		},

		async callCheckForUser() {
			this.$v.client.phoneNumber.$touch();

			if (!this.$v.client.phoneNumber.$invalid) {
				try {
					this.$Progress.start();

					const response = await findUserByPhoneNumber(this.client.phoneNumber);

					this.clientId = response.data.client.id;

					this.client.firstName = response.data.client.firstName;
					this.client.lastName = response.data.client.lastName;
					this.client.email = response.data.client.email;

					this.$Progress.finish();
					this.$toast.success("User found");
				} catch (error) {
					console.log(error);
					this.$Progress.fail();

					if (error.response) {
						if (error.response.status === 404) {
							this.$toast.info(error.response.data.message);
							this.clientId = "";
							this.client.firstName = "";
							this.client.lastName = "";
							this.client.email = "";
						} else {
							this.$toast.error(error.response.data.message);
						}
					} else {
						this.$toast.error("Something went wrong, try again later");
					}
				}
			}
		},

		disableBeforeToday(date) {
			const today = new Date();
			today.setHours(0, 0, 0, 0);

			return date <= today;
		},

		async callCheckForAvailableTables() {
			this.$v.reservation.$touch();

			if (!this.$v.reservation.$invalid) {
				try {
					this.$Progress.start();

					console.log(this.reservation);
					const response = await checkForAvailableTables(this.reservation);

					this.$Progress.finish();
					this.$toast.success(response.data.tableMessage);
				} catch (error) {
					console.log(error);

					if (error.response) {
						this.$toast.error(error.response.data.tableMessage);
					} else {
						this.$toast.error("Something went wrong, try again later");
					}

					this.$Progress.fail();
				}
			}
		},
	},

	components: {
		ViewContainer,
		DatePicker,
		InputGroup,
		Input,
		Button,
	},
};
</script>
