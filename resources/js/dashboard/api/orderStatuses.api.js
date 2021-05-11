import httpClient from '../../api/httpClient';

const END_POINT = '/dashboard/order-statuses';

const downloadStatuses = () => httpClient.get(`${END_POINT}`);

export {
    downloadStatuses,
}