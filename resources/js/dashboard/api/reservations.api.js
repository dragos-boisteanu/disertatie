import httpClient from "../../api/httpClient";

const BASE_URL = "/dashboard/reservations";

const findUserByPhoneNumber = (phoneNumber) => httpClient.get(`dashboard/clients/phone-number/${phoneNumber}`);

export { findUserByPhoneNumber };
