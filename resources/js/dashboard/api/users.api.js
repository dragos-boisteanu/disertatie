import httpClient from '../../api/httpClient';

const END_POINT = '/dashboard/users';

const downloadLoggedUserData = () => httpClient.get(`${END_POINT}/logged-user`);

const downloadUsers = (query) => httpClient.get(`${END_POINT}`, { params: query });
const downloadUser = (id) => httpClient.get(`${END_POINT}/${id}`);
const storeUser = (data) => httpClient.post(`${END_POINT}`, data);
const patchUser = (user) => httpClient.patch(`${END_POINT}/${user.id}`, user);

const disableUser = (id) => httpClient.delete(`${END_POINT}/${id}/disable`, { data: id });
const restoreUser = (id) => httpClient.post(`${END_POINT}/${id}/restore`);

const deleteUser = (id) => httpClient.delete(`${END_POINT}/${id}`, { data: id });

const removeUserAvatar = (data) => httpClient.delete(`${END_POINT}/${data.id}/image`, { data: { id: data.id, imagePath: data.imagePath } });


export {
	downloadLoggedUserData,
	downloadUsers,
	downloadUser,
	storeUser,
	patchUser,
	disableUser,
	restoreUser,
	deleteUser,
	removeUserAvatar,
}