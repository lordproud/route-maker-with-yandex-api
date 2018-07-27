import {
  SEARCH,
  GET_ITEMS,
  SEARCH_LOADING,
  ADD_POINT,
  DELETE_POINT,
  SET_MAP_PARAMS,
} from './types';

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
};

export const getItems = () => ({
  type: GET_ITEMS,
});

export const setItemsLoading = () => ({
  type: SEARCH_LOADING,
});

export const addPoint = point => ({
  type: ADD_POINT,
  payload: point,
});

export const deletePoint = id => ({
  type: DELETE_POINT,
  payload: id,
});

export const setMapParams = (center, zoom) => ({
  type: SET_MAP_PARAMS,
  payload: { center, zoom },
});
