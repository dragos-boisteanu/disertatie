import httpClient from './httpClient';

const BASE_URl = '/delivery-methods';

const fetchDeliveryMethods = () => httpClient.get(`${BASE_URl}`);

export {
    fetchDeliveryMethods
}