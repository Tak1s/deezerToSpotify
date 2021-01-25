import request from '~/common/app/request';

export const getDeezerUser = () => request('/user/deezer');

export const getSpotifyUser = () => request('/user/spotify');

export const getTracks = (service, userId) => request(`/user/${ service }/tracks/${ userId }`);
