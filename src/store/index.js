import { createStore } from "redux";

const initialState = {
  isPlay: false,
  getEpisodes: [],
};

const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case 'GET_POST_DATA':
      return { ...state, getEpisodes: action.payload };

    case 'IS_PLAY_FALSE' :
      return { isPlay: false };

    case 'IS_PLAY_TRUE' :
      return { isPlay: true };
      
    default:
      return state;
    }
};

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
