import { SET_TRACKS } from './actionTypes';

import {
  getTracks
} from '~/requests';

export const getServiceTracks = (service, id) => async (dispatch) => {
  const collections = await getTracks(service, id);

  if (Object.keys(collections).length) {
    dispatch({
      type: SET_TRACKS,
      payload: { service, collections }
    });
  }
};
