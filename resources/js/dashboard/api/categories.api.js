import httpClient from './httpClient';

const BASE_URL = '/categories'

const downloadCategories = () => httpClient.get(`${BASE_URL}`);
const downloadCategory = (id) => httpClient.get(`${BASE_URL}/${id}`);
const postCategory = (category) => httpClient.post(`${BASE_URL}`,  {category});
const patchCategory = (category) => httpClient.patch(`${BASE_URL}/${category.id}`, {category});
const deleteCategory = (id) => httpClient.delete(`${BASE_URL}/${id}`, {data:id});

export {
    downloadCategories,
    downloadCategory,
    postCategory,
    patchCategory,
    deleteCategory
}