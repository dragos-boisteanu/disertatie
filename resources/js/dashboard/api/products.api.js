import httpClient from '../../api/httpClient';

const END_POINT = '/dashboard/products';

const downloadProducts = (query) => httpClient.get(`${END_POINT}`, {params: query});
const downloadProduct = (id) => httpClient.get(`${END_POINT}/${id}`);
const storeProduct = (data) => httpClient.post(`${END_POINT}`, data);
const patchProduct = (data) => httpClient.patch(`${END_POINT}/${data.id}`, data);

const disableProduct = (id) => httpClient.delete(`${END_POINT}/${id}/disable`, {data: id});
const restoreProduct = (id) => httpClient.post(`${END_POINT}/${id}/restore`);

const deleteProduct = (id) => httpClient.delete(`${END_POINT}/${id}`, {data: id});

const downloadProductByBarcode = (barcode) => httpClient.get(`${END_POINT}/check-barcode/${barcode}`);

export {
    downloadProducts,
    downloadProduct,
    storeProduct,
    patchProduct,
    disableProduct,
    restoreProduct,
    deleteProduct,
    downloadProductByBarcode,
}