import httpClient from '../../api/httpClient';

const END_POINT = '/dashboard/roles';

const downloadRoles = (type) => httpClient.get(`${END_POINT}`, {params: type});

export {
    downloadRoles
}