import httpClient from '../../api/httpClient';

const BASE_URL = '/dashboard/categories'

const searchCategories = (value) => httpClient.get(`${BASE_URL}/${value}`);

const downloadCategories = () => httpClient.get(`${BASE_URL}`);

const postCategory = (category) => httpClient.post(`${BASE_URL}`,  category);
const patchCategory = (category) => httpClient.patch(`${BASE_URL}/${category.id}`, category);

const updatePosition = (data) => httpClient.patch(`${BASE_URL}/update-position`, data);

const disableCategory = (id) => httpClient.delete(`${BASE_URL}/${id}/disable`, {data:id});
const restoreCategory = (id) => httpClient.post(`${BASE_URL}/${id}/restore`);
const deleteCategory = (id) => httpClient.delete(`${BASE_URL}/${id}`, {data:id});

export {
    searchCategories,
    downloadCategories,
    postCategory,
    patchCategory,
    updatePosition,
    disableCategory,
    restoreCategory,
    deleteCategory
}