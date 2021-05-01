import httpClient from '../api/httpClient'

const BASE_URL = '/stocks';

const updateStock = (payload) => httpClient.patch(`${BASE_URL}/${payload.id}`, payload.data);
const downloadProduct = (barcode) => httpClient.get(`${BASE_URL}/products/${barcode}`);
const downloadIngredientStockDetails = (input) => httpClient.get(`${BASE_URL}/ingredients/${input}`);
export {
    updateStock,
    downloadProduct,
    downloadIngredientStockDetails,
}