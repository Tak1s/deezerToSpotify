import { SET_TRACKS } from './actionTypes';

const initState = {
  collection: {}
};

export default function collectionsReducer(state = initState, action) {
  switch (action.type) {
    case SET_TRACKS:
      return {
        ...state,
        collection: action.payload
      };
    default:
      return state;
  }
}
