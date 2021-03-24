import httpClient from './httpClient';

const END_POINT = '/products';

const downloadProducts = (query) => httpClient.get(`${END_POINT}`, {params: query});
const downloadProduct = (id) => httpClient.get(`${END_POINT}/${id}`);
const storeProduct = (data) => httpClient.post(`${END_POINT}`, data);
const patchProduct = (data) => httpClient.patch(`${END_POINT}/${data.id}`, {product});
const disableProduct = (id) => httpClient.delete(`${END_POINT}/disable`, {data: id});
const downloadProductByBarcode = (barcode) => httpClient.get(`${END_POINT}/check-barcode/${barcode}`);

export {
    downloadProducts,
    downloadProduct,
    storeProduct,
    patchProduct,
    disableProduct,
    downloadProductByBarcode
}