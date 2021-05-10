import httpClient from './httpClient'

const END_POINT = '/order-statuses';

const downloadStatuses = () => httpClient.get(`${END_POINT}`);

export {
    downloadStatuses,
}