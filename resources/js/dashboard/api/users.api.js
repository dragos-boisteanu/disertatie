

import httpClient from './httpClient';

const END_POINT = '/users';

const downloadUsers = (page) => httpClient.get(`${END_POINT}?page=${page}`);
const downloadUser = (id) => httpClient.get(`${END_POINT}/${id}`);
const patchUser = (user) => httpClient.patch(`${END_POINT}/${user.id}`, user);
const disableUser = (id) => httpClient.delete(`${END_POINT}/${id}/disable`, {data: id});
const deleteUser = (id) => httpClient.delete(`${END_POINT}/${id}/delete`, {data: id});

export {
    downloadUsers,
    downloadUser,
    patchUser,
    disableUser,
    deleteUser
}