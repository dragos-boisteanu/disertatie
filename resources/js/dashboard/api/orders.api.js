import httpClient from '../../api/httpClient';
const END_POINT = '/dashboard/orders'

const fetchProductsByName = (name) => httpClient.get(`${END_POINT}/products/name/${name}`);
const fetchProductById = (id) => httpClient.get(`${END_POINT}/products/id/${id}`);

const downloadOrders = (query) => httpClient.get(`${END_POINT}`, {params: query});
const downloadOrder = (id) => httpClient.get(`${END_POINT}/${id}`);
const storeOrder = (order) => httpClient.post(`${END_POINT}`, order);

const disableOrder = (id) => httpClient.delete(`${END_POINT}/${id}/disable`, {data: id});
const enable = (id) => httpClient.post(`${END_POINT}/${id}/enable`);

export {
    downloadOrders,
    downloadOrder,
    fetchProductsByName,
    fetchProductById,
    storeOrder,
    disableOrder,
    enable
}
