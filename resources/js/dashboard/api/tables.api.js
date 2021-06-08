import httpClient from '../../api/httpClient'

const BASE_URL = "/dashboard/tables";

const downloadTables = () => httpClient.get(`${BASE_URL}`);

export {
  downloadTables
}

