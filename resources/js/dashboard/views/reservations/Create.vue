<template>
	<ViewContainer>
		<template slot="header"> Create reservation </template>
		<form class="flex flex-col ">
			<div class="flex flex-col lg:items-start lg:flex-row lg:gap-x-6 w-full lg:w-1/2 2xl:w-1/5">
				<div class="flex flex-col gap-y-3 bg-white shadow rounded-sm p-5 lg:flex-1">
					<div>
						<h2 class="mb-5 text-xl font-semibold">Client Data</h2>
						<div class="flex flex-col gap-4 md:flex md:flex-row md:items-center md:justify-between">
							<InputGroup id="firstName" label="First name" :hasError="$v.client.firstName.$error" class="flex-1">
								<Input
									v-model="$v.client.firstName.$model"
									id="firstName"
									name="firstName"
									:class="{
										'border-red-600': $v.client.firstName.$error,
										'border-green-600': $v.client.firstName.$dirty && !$v.client.firstName.$error,
									}"
								/>
							</InputGroup>
							<InputGroup id="lastName" label="Last name" :hasError="$v.client.lastName.$error" class="flex-1">
								<Input
									v-model="$v.client.lastName.$model"
									id="lastName"
									name="lastName"
									:class="{
										'border-red-600': $v.client.lastName.$error,
										'border-green-600': $v.client.lastName.$dirty && !$v.client.lastName.$error,
									}"
								/>
							</InputGroup>
						</div>
						<div class="flex flex-col gap-4 mt-4 md:flex md:flex-row md:items-center md:justify-between">
							<InputGroup id="phoneNumber" label="Phone number" :hasError="$v.client.phoneNumber.$error" class="flex-1">
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
							</InputGroup>
							<InputGroup id="email" label="Email" :hasError="$v.client.email.$error" class="flex-1">
								<Input
									v-model="$v.client.email.$model"
									id="email"
									name="email"
									:class="{
										'border-red-600': $v.client.email.$error,
										'border-green-600': $v.client.email.$dirty && !$v.client.email.$error,
									}"
								/>
							</InputGroup>
						</div>
					</div>
					<div class="mt-4">
						<h2 class="mb-5 text-xl font-semibold">Reservation details</h2>
						<div class="flex flex-col gap-y-4 md:flex md:flex-row md:items-center md:justify-between md:gap-x-4">
							<InputGroup id="reservationDate" label="Date" :hasError="$v.reservation.date.$error" class="flex-1">
								<date-picker
									v-model="$v.reservation.date.$model"
									type="date"
									placeholder="Reservation date"
									confirm-text="Ok"
									valueType="format"
									format="D-MM-YYYY"
									:confirm="true"
									@input="callCheckForAvailableTables"
								>
								</date-picker>
							</InputGroup>
							<InputGroup id="time" label="Time" :hasError="$v.reservation.time.$error" class="flex-1">
								<date-picker
									v-model="$v.reservation.time.$model"
									type="time"
									placeholder="Reservation time"
									confirm-text="Ok"
									valueType="format"
									format="HH:mm"
									:confirm="true"
									@input="callCheckForAvailableTables"
								>
								</date-picker>
							</InputGroup>
							<InputGroup id="seats" label="Seats" :hasError="$v.reservation.seats.$error" class="flex-1">
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
							</InputGroup>
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

import { findUserByPhoneNumber, checkForAvailableTables } from "../../api/reservations.api";

import { required, email, maxLength, numeric } from "vuelidate/lib/validators";

import { alphaSpaces, phoneNumber } from "../../validators/index";

export default {
	data() {
		return {
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
				// phoneNumber,
			},
			email: {
				required,
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
			const payload = {
				payload: this.reservation,
			};

			if (this.clientId) {
				payload.clientId = this.clientId;
			} else {
				payload.client = this.client;
			}

			console.log(payload);

			try {
				this.$Progress.start();

				const response = {
					data: {
						message: "Reservation created successfuly",
					},
				};

				this.$Progress.finish();
				this.$toast.success(response.data.message);
			} catch (error) {
				this.$Progress.fail();

				if (error.response) {
					this.toast.error(error.response.data.message);
				} else {
					console.log(error);
					this.$toast.error("Something went wrong, try again later");
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
						this.$toast.error(error.response.data.message);
					} else {
						this.$toast.error("Something went wrong, try again later");
					}
				}
			}
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
