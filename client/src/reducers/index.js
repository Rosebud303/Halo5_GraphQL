import { combineReducers } from 'redux';
import * as reducers from './allReducers';

const rootReducer = combineReducers({
  currentPlayer: reducers.currentPlayerReducer,
  currentImgUrlSpartan: reducers.currentUrlSpartanReducer
})

export default rootReducer;