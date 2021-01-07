import request from '~/common/app/request';

export const getPositionList = (search = '') => request(`/api/evo?search=${ search }`);
