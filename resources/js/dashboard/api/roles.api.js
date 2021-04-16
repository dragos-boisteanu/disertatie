import httpClient from './httpClient';

const END_POINT = '/roles';

const downloadRoles = () => httpClient.get(`${END_POINT}`);

export {
    downloadRoles
}