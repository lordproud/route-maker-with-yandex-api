import { SEARCH, GET_ITEMS, SEARCH_LOADING } from './types';

const GEOCODE_URL = 'https://geocode-maps.yandex.ru/1.x/?format=json&geocode=';

export const search = queryStr => dispatch => {
  dispatch(setItemsLoading());
  fetch(GEOCODE_URL + queryStr)
    .then(res => res.json())
    .then(data =>
      dispatch({
        type: SEARCH,
        payload: data,
      })
    )
    .catch(err => console.log(err));
};

export const getItems = () => ({
  type: GET_ITEMS,
});

export const setItemsLoading = () => ({
  type: SEARCH_LOADING,
});
