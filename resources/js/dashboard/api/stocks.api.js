import httpClient from '../api/httpClient'

const BASE_URL = '/stocks';

const updateStock = (payload) => httpClient.patch(`${BASE_URL}/${payload.id}`, payload.data);
const downloadProduct = (barcode) => httpClient.get(`${BASE_URL}/products/${barcode}`);
const downloadIngredientById = (id) => httpClient.get(`${BASE_URL}/ingredients/${id}`);

export {
    updateStock,
    downloadProduct,
    downloadIngredientById
}