import httpClient from '../../api/httpClient';

const BASE_URl = '/dashboard/delivery-methods';

const fetchDeliveryMethods = () => httpClient.get(`${BASE_URl}`);

export {
    fetchDeliveryMethods
}