import httpClient from '../../api/httpClient'

const BASE_URL = "/dashboard/tables";

const downloadTables = () => httpClient.get(`${BASE_URL}`);
const storeTable = (data) => httpClient.post(`${BASE_URL}`, data);
const patchTable = (data) => httpClient.patch(`${BASE_URL}/${data.id}`, data.name);
const disableTable = (id) => httpClient.delete(`${BASE_URL}/${id}/disable`, { data: id });
const restoreTable = (id) => httpClient.post(`${BASE_URL}/${id}/restore`, id);
const deleteTable = (id) => httpClient.delete(`${BASE_URL}/${id}`, { data: id });

export {
	downloadTables,
	storeTable,
	patchTable,
	disableTable,
	restoreTable,
	deleteTable
}

