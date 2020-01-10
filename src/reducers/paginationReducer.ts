import {
  PaginationState,
  PaginationTypes,
  HANDLE_PAGE_SIZE,
  HANDLE_PAGE_NUMBER,
  HANDLE_SELECT_PAGE_SIZE_VISABILITY,
} from '../constants/actionTypes';

const initialState: PaginationState = {
  pageNumber: 1,
  pageSize: 50,
  isPageSizeListOpened: false,
};


const paginationReducer = (state = initialState, action: PaginationTypes): PaginationState => {
  switch (action.type) {
    case HANDLE_PAGE_SIZE:
      return { ...state, pageSize: action.pageSize };
    case HANDLE_PAGE_NUMBER:
      return { ...state, pageNumber: action.pageNumber };
    case HANDLE_SELECT_PAGE_SIZE_VISABILITY:
      return { ...state, isPageSizeListOpened: !state.isPageSizeListOpened };
    default:
      return state;
  }
};
export default paginationReducer;
