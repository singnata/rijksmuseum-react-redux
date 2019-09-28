import {
  HANDLE_SEARCH,
  HANDLE_ORDER,
  RESET_QUERY_PARAM,
  HANDLE_SELECT_ORDER_BY_LIST_VISABILITY,
} from '../constants/actionTypes';

export const handleOrderByParams = (orderByParam) => (dispatch) => {
  dispatch({ type: HANDLE_ORDER, orderByParam });
};

export const handleSearchParams = (queryParam) => (dispatch) => {
  dispatch({ type: HANDLE_SEARCH, queryParam });
};

export const resetQueryParam = () => (dispatch) => {
  dispatch({ type: RESET_QUERY_PARAM });
};

export const handleSelectOrderByVisability = () => (dispatch) => {
  dispatch({ type: HANDLE_SELECT_ORDER_BY_LIST_VISABILITY });
};
