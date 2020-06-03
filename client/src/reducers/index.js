import { combineReducers } from 'redux';
import * as reducers from './allReducers';

const rootReducer = combineReducers({
  currentPlayer: reducers.currentPlayerReducer,
  currentImgUrlSpartan: reducers.currentUrlSpartanReducer,
  currentImgUrlEmblem: reducers.currentUrlEmblemReducer,
  currentWzVariantId: reducers.currentWarzoneIdReducer,
});

export default rootReducer;
