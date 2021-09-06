import httpClient from '../../api/httpClient';

const BASE_URL = '/dashboard/categories'

const searchCategories = (value) => httpClient.get(`${BASE_URL}/${value}`);

const downloadCategories = () => httpClient.get(`${BASE_URL}`);

const postCategory = (category) => httpClient.post(`${BASE_URL}`, category);
const patchCategory = (category) => httpClient.patch(`${BASE_URL}/${category.id}`, category);

const addDiscount = (data) => httpClient.post(`${BASE_URL}/${data.id}/discounts/${data.discountId}`);
const removeDiscount = (id) => httpClient.delete(`${BASE_URL}/${id}/discounts`, { data: id });

const updatePosition = (data) => httpClient.patch(`${BASE_URL}/position`, data);
const updateSubCategoryPosition = (data) => httpClient.patch(`${BASE_URL}/position/${data.id}/${data.direction}`);

const removeParent = (id) => httpClient.patch(`${BASE_URL}/parent-removal/${id}`);

const disableCategory = (id) => httpClient.delete(`${BASE_URL}/${id}/disable`, { data: id });
const restoreCategory = (id) => httpClient.post(`${BASE_URL}/${id}/restore`);
const deleteCategory = (id) => httpClient.delete(`${BASE_URL}/${id}`, { data: id });

const removeImage = (data) => httpClient.delete(`${BASE_URL}/${data.id}/image`, { data: { id: data.id, imagePath: data.image } });

export {
	searchCategories,
	downloadCategories,
	postCategory,
	patchCategory,
	updatePosition,
	updateSubCategoryPosition,
	addDiscount,
	removeDiscount,
	disableCategory,
	restoreCategory,
	deleteCategory,
	removeParent,
	removeImage
}