import httpClient from '../../api/httpClient';

const BASE_URL = '/dashboard/categories'

const searchCategory = (catagoryName) => httpClient.get(`${BASE_URL}/${catagoryName}`);

const downloadCategories = () => httpClient.get(`${BASE_URL}`);

const postCategory = (category) => httpClient.post(`${BASE_URL}`,  category);
const patchCategory = (category) => httpClient.patch(`${BASE_URL}/${category.id}`, category);

const disableCategory = (id) => httpClient.delete(`${BASE_URL}/${id}/disable`, {data:id});
const restoreCategory = (id) => httpClient.post(`${BASE_URL}/${id}/restore`);
const deleteCategory = (id) => httpClient.delete(`${BASE_URL}/${id}`, {data:id});

export {
    searchCategory,
    downloadCategories,
    postCategory,
    patchCategory,
    disableCategory,
    restoreCategory,
    deleteCategory
}