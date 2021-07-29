import httpClient from "../../api/httpClient";

const BASE_URL = "/dashboard/reservations";

const downloadReservations = (query) => httpClient.get(`${BASE_URL}`, { params: query });
const downloadReservation = (id) => httpClient.get(`${BASE_URL}/${id}`);

const findUserByPhoneNumber = (phoneNumber) => httpClient.get(`dashboard/clients/phone-number/${phoneNumber}`);

const checkForAvailableTables = (data) =>
	httpClient.get("client/reservations/available-tables", {
		params: { date: data.date, time: data.time, seats: data.seats },
	});

const storeReservation = (data) => httpClient.post(`${BASE_URL}`, data);
const disableReservation = (id) => httpClient.delete(`${BASE_URL}/${id}`, { data: id });

const updateReservationStatus = (data) => httpClient.patch(`${BASE_URL}/${data.id}`, { statusId: data.statusId });

export {
	downloadReservations,
	downloadReservation,
	findUserByPhoneNumber,
	checkForAvailableTables,
	storeReservation,
	disableReservation,
	updateReservationStatus,
};
