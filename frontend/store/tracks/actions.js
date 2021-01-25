import { SET_TRACKS } from './actionTypes';

import {
  getTracks
} from '~/requests';

export const getServiceTracks = (service) => async (dispatch, getState) => {
  const { id = null } = getState()[service];
  const collections = await getTracks(service, id);

  if (Object.keys(collections).length) {
    dispatch({
      type: SET_TRACKS,
      payload: collections
    });
  }
};
