import { SEARCH, GET_ITEMS, SEARCH_LOADING } from '../actions/types';

const initialState = {
  items: [],
  mapParams: {
    center: [61.0, 69.03],
    zoom: 14,
  },
  pointsOfRoutes: [],
  loading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SEARCH:
      const parseData = action.payload.response.GeoObjectCollection.featureMember.map(
        (val, i) => ({
          id: i,
          pos: val.GeoObject.Point.pos.split(' ').map(p => parseFloat(p)),
          name: val.GeoObject.metaDataProperty.GeocoderMetaData.text,
        })
      );
      return { ...state, items: parseData, loading: false };

    case SEARCH_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_ITEMS:
      return {
        ...state,
      };
    default:
      return state;
  }
}
