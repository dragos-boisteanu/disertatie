import httpClient from '../../api/httpClient';

const END_POINT = '/dashboard/statuses';

const downloadOrdersStatuses = () => httpClient.get(`${END_POINT}/orders`);

export {
    downloadOrdersStatuses
}
