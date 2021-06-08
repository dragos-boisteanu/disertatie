import httpClient from '../../api/httpClient';

const END_POINT = '/dashboard/statuses';

const downloadOrdersStatuses = () => httpClient.get(`${END_POINT}/orders`);
const downloadTableStatuses = () => httpClient.get(`${END_POINT}/tables`);

export {
    downloadOrdersStatuses,
    downloadTableStatuses
}
