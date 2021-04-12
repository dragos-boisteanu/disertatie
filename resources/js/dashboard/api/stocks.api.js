import httpClient from '../api/httpClient'

const BASE_URL = '/stocks';

const updateStock = (payload) => httpClient.patch(`${BASE_URL}/${payload.id}`, payload.data);
const downloadProduct = (barcode) => httpClient.get(`${BASE_URL}/product/${barcode}`);
const downloadIngredient = (id) => httpClient.get(`${BASE_URL}/ingredient/${id}`);

export {
    updateStock,
    downloadProduct,
    downloadIngredient
}