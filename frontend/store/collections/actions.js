import { SET_COLLECTIONS } from './actionTypes';
import { getPositionList } from '~/requests';

export const itemsFetchData = (search = '') => async (dispatch) => {
  const collections = await getPositionList(search);

  dispatch({
    type: SET_COLLECTIONS,
    payload: collections
  });
};

// eslint-disable-next-line no-unused-vars
export function itemsReloadData(search) {
  return async (dispatch) => {
    const response = await fetch('/api/evo/reload');
    // eslint-disable-next-line no-unused-vars
    const collections = await response.json();
    dispatch(itemsFetchData());
  };
}
