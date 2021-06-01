import httpClient from '../../api/httpClient';

const BASE_URL = '/dashboard/discounts';

const downloadDiscounts = () => httpClient.get(`${BASE_URL}`);
const postDiscount = (payload) => httpClient.post(`${BASE_URL}`, payload); 
const patchDiscount = (payload) => httpClient.patch(`${BASE_URL}/${payload.id}`, payload);
const deleteDiscount = (id) => httpClient.delete(`${BASE_URL}/${id}`, {data:id});

const disableDiscount = (id) => httpClient.delete(`${BASE_URL}/${id}/disable`, {data:id});
const restoreDiscount = (id) => httpClient.post(`${BASE_URL}/${id}/restore`);

export {
    downloadDiscounts,
    postDiscount,
    patchDiscount,
    deleteDiscount,
    disableDiscount,
    restoreDiscount
}