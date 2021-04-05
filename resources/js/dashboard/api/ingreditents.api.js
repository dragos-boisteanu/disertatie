import httpClient from './httpClient';

const BASE_URL = '/ingredients'

const downloadIngredients = () => httpClient.get(`${BASE_URL}`);
const postIngredient = (ingredient) => httpClient.post(`${BASE_URL}`,  ingredient);
const patchIngredient = (ingredient) => httpClient.patch(`${BASE_URL}/${ingredient.id}`, ingredient);
const deleteIngredient = (id) => httpClient.delete(`${BASE_URL}/${id}`, {data:id});

export {
    downloadIngredients,
    postIngredient,
    patchIngredient,
    deleteIngredient
}