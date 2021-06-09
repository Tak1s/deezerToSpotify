import { SET_TRACKS } from './actionTypes';

const initState = {
};

export default function collectionsReducer(state = initState, action) {
  switch (action.type) {
    case SET_TRACKS:
      return {
        ...state,
        [action.payload.service]: action.payload.collections
      };
    default:
      return state;
  }
}
