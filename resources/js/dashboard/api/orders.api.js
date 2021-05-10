import httpClient from './httpClient'

const END_POINT = '/orders'

const fetchProductsByName = (name) => httpClient.get(`${END_POINT}/products/name/${name}`);
const fetchProductById = (id) => httpClient.get(`${END_POINT}/products/id/${id}`);

const downloadOrders = (filter) => httpClient.get(`${END_POINT}`, filter);
const storeOrder = (order) => httpClient.post(`${END_POINT}`, order);

export {
    downloadOrders,
    fetchProductsByName,
    fetchProductById,
    storeOrder
}
