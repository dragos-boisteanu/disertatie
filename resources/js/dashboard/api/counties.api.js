import axios from "axios"

const BASE_URL = 'client';

const downloadCounties = () => {
    return axios.get(`${BASE_URL}/counties`);
}

const downloadCities = (id) => {
    return axios.get(`${BASE_URL}/cities/${id}`);
}

export {
    downloadCounties,
    downloadCities
}