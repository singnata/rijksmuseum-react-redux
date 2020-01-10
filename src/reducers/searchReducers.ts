import {
  SearchState,
  SearchTypes,
  HANDLE_SEARCH,
  HANDLE_ORDER,
  HANDLE_SELECT_ORDER_BY_LIST_VISABILITY,
  RESET_QUERY_PARAM,
} from '../constants/actionTypes';

const initialState: SearchState = {
  queryParam: '',
  orderByParam: '',
  isOrderByListOpened: false,
};


const searchReducer = (state = initialState, action: SearchTypes): SearchState => {
  switch (action.type) {
    case HANDLE_SEARCH:
      return { ...state, queryParam: action.queryParam };
    case HANDLE_ORDER:
      return { ...state, orderByParam: action.orderByParam };
    case HANDLE_SELECT_ORDER_BY_LIST_VISABILITY:
      return { ...state, isOrderByListOpened: !state.isOrderByListOpened };
    case RESET_QUERY_PARAM:
      return { ...state, queryParam: '' };

    default:
      return state;
  }
};
export default searchReducer;
