import httpClient from '../../api/httpClient';

const BASE_URL = '/dashboard/stocks';

const updateStock = (payload) => httpClient.patch(`${BASE_URL}/${payload.id}`, payload.data);
const downloadProductStockDetails = (barcode) => httpClient.get(`${BASE_URL}/products/${barcode}`);
const downloadIngredientStockDetails = (input) => httpClient.get(`${BASE_URL}/ingredients/${input}`);
export {
    updateStock,
    downloadProductStockDetails,
    downloadIngredientStockDetails,
}