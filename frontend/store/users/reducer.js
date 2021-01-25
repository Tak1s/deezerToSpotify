import {
  SET_DEEZER_INFO,
  SET_SPOTIFY_INFO
} from './actionTypes';

const initState = {
  deezer: {},
  spotify: {}
};

export default function collectionsReducer(state = initState, action) {
  switch (action.type) {
    case SET_DEEZER_INFO:
      return {
        ...state,
        deezer: action.payload
      };
    case SET_SPOTIFY_INFO:
      return {
        ...state,
        spotify: action.payload
      };
    default:
      return state;
  }
}
