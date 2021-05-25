import httpClient from '../../api/httpClient';
const END_POINT = '/dashboard/orders'

const fetchProductsByName = (name) => httpClient.get(`${END_POINT}/products/name/${name}`);
const fetchProductById = (id) => httpClient.get(`${END_POINT}/products/id/${id}`);

const downloadOrders = (query) => httpClient.get(`${END_POINT}`, {params: query});
const downloadOrder = (id) => httpClient.get(`${END_POINT}/${id}`);
const storeOrder = (order) => httpClient.post(`${END_POINT}`, order);

const patchOrder = (data) => httpClient.patch(`${END_POINT}/${data.id}`, data);

const removeItem = (data) =>httpClient.patch(`${END_POINT}/remove-item/${data.id}`, data);
const addItem = (data) =>httpClient.patch(`${END_POINT}/add-item/${data.id}`, data);
const pathItem = (data) => httpClient.patch(`${END_POINT}/patch-item/${data.id}`, data);

const disableOrder = (id) => httpClient.delete(`${END_POINT}/${id}/disable`, {data: id});
const enable = (id) => httpClient.post(`${END_POINT}/${id}/enable`);

export {
    downloadOrders,
    downloadOrder,
    fetchProductsByName,
    fetchProductById,
    storeOrder,
    disableOrder,
    enable,
    patchOrder,
    removeItem

}
