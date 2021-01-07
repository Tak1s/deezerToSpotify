import { SET_COLLECTIONS } from './actionTypes';
// TODO: mock for development
import mock from '../mock';

const initState = {
  collections: mock || []
};

export default function collectionsReducer(state = initState, action) {
  switch (action.type) {
    case SET_COLLECTIONS:
      return {
        ...state,
        collections: action.payload
      };
    default:
      return state;
  }
}
