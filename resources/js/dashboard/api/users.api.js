

import httpClient from './httpClient';

const END_POINT = '/users';

const downloadUsers = (query) => httpClient.get(`${END_POINT}`, {params: query});
const downloadUser = (id) => httpClient.get(`${END_POINT}/${id}`);
const storeUser = (user) => httpClient.post(`${END_POINT}`, {user});
const patchUser = (user) => httpClient.patch(`${END_POINT}/${user.id}`, user);
const disableUser = (id) => httpClient.delete(`${END_POINT}/${id}/disable`, {data: id});
const deleteUser = (id) => httpClient.delete(`${END_POINT}/${id}/delete`, {data: id});

export {
    downloadUsers,
    downloadUser,
    storeUser,
    patchUser,
    disableUser,
    deleteUser
}