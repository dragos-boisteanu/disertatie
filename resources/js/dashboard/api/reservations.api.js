import httpClient from "../../api/httpClient";

const BASE_URL = "/dashboard/reservations";

const findUserByPhoneNumber = (phoneNumber) => httpClient.get(`dashboard/clients/phone-number/${phoneNumber}`);
const checkForAvailableTables = (data) =>
	httpClient.get("client/reservations/available-tables", {
		params: { date: data.date, time: data.time, seats: data.seats },
	});
const storeReservation = (data) => httpClient.post(`${BASE_URL}`, data);

export { findUserByPhoneNumber, checkForAvailableTables, storeReservation };
