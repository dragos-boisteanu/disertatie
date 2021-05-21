import httpClient from '../../api/httpClient';

const END_POINT = 'dashboard/clients'

const downloadClientByPhoneNumber = (phoneNumber) => httpClient.get(`${END_POINT}/phone-number/${phoneNumber}`);
const downoloadClientAddress = (id) => httpClient.get(`${END_POINT}/addresses/${id}`);

export {
  downloadClientByPhoneNumber,
  downoloadClientAddress
}

