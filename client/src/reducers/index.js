import { combineReducers } from 'redux';
import * as reducers from './allReducers';

const rootReducer = combineReducers({
  currentPlayer: reducers.currentPlayerReducer
})

export default rootReducer;