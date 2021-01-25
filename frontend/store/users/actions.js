import {
  SET_DEEZER_INFO,
  SET_SPOTIFY_INFO
} from './actionTypes';

import {
  getDeezerUser,
  getSpotifyUser
} from '~/requests';

export const getDeezerInfo = () => async (dispatch) => {
  const collections = await getDeezerUser();

  if (Object.keys(collections).length) {
    dispatch({
      type: SET_DEEZER_INFO,
      payload: collections
    });
  }
};

export const getSpotifyInfo = () => async (dispatch) => {
  const collections = await getSpotifyUser();

  if (Object.keys(collections).length) {
    dispatch({
      type: SET_SPOTIFY_INFO,
      payload: {
        name: collections.display_name || null,
        ...collections
      }
    });
  }
};
