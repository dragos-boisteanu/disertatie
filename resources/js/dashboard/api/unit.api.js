import httpClient from './httpClient';

const BASE_URL = 'dashboard/units';

const downloadUnits = () => httpClient.get(`${BASE_URL}`);
const patchUnit = (data) => httpClient.patch(`${BASE_URL}/${data.id}`, {data});

export {
    downloadUnits,
    patchUnit
}