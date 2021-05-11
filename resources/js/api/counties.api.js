import httpClient from './httpClient';

const BASE_URL = '/client';

const downloadCounties = () => httpClient.get(`${BASE_URL}/counties`);

const downloadCities = (id) => httpClient.get(`${BASE_URL}/cities/${id}`);

export {
    downloadCounties,
    downloadCities
}