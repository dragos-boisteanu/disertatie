import httpClient from '../../api/httpClient'

const BASE_URL = '/client/cart'
const addItemTocart = (item) => httpClient.post(`${BASE_URL}`, item);
const patchItem = (item) => httpClient.patch(`${BASE_URL}/${item.id}`, item);
const removeItemFromCart = (item) => httpClient.delete(`${BASE_URL}/${item.id}`, {data: item.id});

export {
  addItemTocart,
  patchItem,
  removeItemFromCart
}