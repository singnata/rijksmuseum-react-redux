import {
  HANDLE_PAGE_SIZE,
  HANDLE_PAGE_NUMBER,
  HANDLE_SELECT_PAGE_SIZE_VISABILITY,
} from '../constants/actionTypes';

export const handleSelectPageSizeVisability = () => (dispatch) => {
  dispatch({ type: HANDLE_SELECT_PAGE_SIZE_VISABILITY });
};

export const handlePageSize = (pageSize) => (dispatch) => {
  dispatch({ type: HANDLE_PAGE_SIZE, pageSize });
};

export const handlePageNumber = (pageNumber) => (dispatch) => {
  dispatch({ type: HANDLE_PAGE_NUMBER, pageNumber });
};
