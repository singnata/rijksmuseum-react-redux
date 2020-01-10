import { combineReducers } from 'redux';

import picturesReducer from './picturesReducer';
import searchReducer from './searchReducers';
import paginationReducer from './paginationReducer';

const rootReducer = combineReducers({
  picturesState: picturesReducer,
  searchState: searchReducer,
  paginationState: paginationReducer
});

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer;
