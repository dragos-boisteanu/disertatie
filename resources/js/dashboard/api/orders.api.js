import httpClient from './httpClient'

const END_POINT = '/orders'
const fetchProductsByName = (name) => httpClient.get(`${END_POINT}/products/name/${name}`);
const fetchProductById = (id) => httpClient.get(`${END_POINT}/products/id/${id}`);

export {
    fetchProductsByName,
    fetchProductById
}
