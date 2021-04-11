import httpClient from '../api/httpClient'

const BASE_URL = '/stocks';

const updateStock = (payload) => httpClient.patch(`${BASE_URL}/${payload.id}`, payload.data);

export {
    updateStock
}