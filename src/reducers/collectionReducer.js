import {
  FETCH_COLLECTION_REQUEST,
  FETCH_COLLECTION_SUCCESS,
  FETCH_COLLECTION_FAILURE,
  FETCH_PICTURE_INFO_REQUEST,
  FETCH_PICTURE_INFO_FAILURE,
  FETCH_PICTURE_INFO_SUCCESS,
  HANDLE_PAGE_SIZE,
  HANDLE_PAGE_NUMBER,
  HANDLE_SEARCH,
  HANDLE_ORDER,
  HANDLE_SELECT_PAGE_SIZE_VISABILITY,
  HANDLE_SELECT_ORDER_BY_LIST_VISABILITY,
  OPEN_PICTURE_DETAILS_POP_UP,
  CLOSE_PICTURE_DETAILS_POP_UP,
  SHOW_PICTURE_TITLE,
  HIDE_PICTURE_TITLE,
  RESET_QUERY_PARAM,
} from './../constants/actionTypes';

const initialState = {
  isError: false,
  pictureList: [],
  isLoading: false,
  pageNumber: 1,
  pageSize: 50,
  queryParam: '',
  orderByParam: '',
  isPageSizeListOpened: false,
  isOrderByListOpened: false,
  isMainContentBlurred: false,
  picture: null,
};

const togglePopUpTargetToSelectedPicture = (state, action) => {
  let hoveredPicture = action.payload.selectedPicture;
  let newPictureList = state.pictureList.artObjects.map((picture) => {
    hoveredPicture.popUpTarget = action.payload.popUpTarget;
    if (picture.id !== hoveredPicture.id) {
      return picture;
    }
    return {
      ...picture,
      ...hoveredPicture,
    };
  });

  return {
    ...state,
    pictureList: {
      ...state.pictureList,
      artObjects: [...newPictureList],
    },
  };
};

const setIsPictureTitleShownProperty = (state, action, value) => {
  let hoveredPicture = action.picture;
  let newPictureList = state.pictureList.artObjects.map((picture) => {
    hoveredPicture.isPictureTitleShown = value;
    if (picture.id !== hoveredPicture.id) {
      return picture;
    }
    return {
      ...picture,
      ...hoveredPicture,
    };
  });

  return {
    ...state,
    pictureList: {
      ...state.pictureList,
      artObjects: [...newPictureList],
    },
  };
};

const collectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COLLECTION_REQUEST:
      return { ...state, isLoading: true, isError: false };
    case FETCH_COLLECTION_SUCCESS:
      return { ...state, pictureList: action.pictureList, isLoading: false };
    case FETCH_COLLECTION_FAILURE:
      return { ...state, isError: true };
    case FETCH_PICTURE_INFO_REQUEST:
      return { ...state, isLoading: true, isError: false };
    case FETCH_PICTURE_INFO_SUCCESS:
      return { ...state, picture: action.picture, isLoading: false };
    case FETCH_PICTURE_INFO_FAILURE:
      return { ...state, isError: true };
    case HANDLE_PAGE_SIZE:
      return { ...state, pageSize: action.pageSize };
    case HANDLE_PAGE_NUMBER:
      return { ...state, pageNumber: action.pageNumber };
    case HANDLE_SEARCH:
      return { ...state, queryParam: action.queryParam };
    case HANDLE_ORDER:
      return { ...state, orderByParam: action.orderByParam };
    case HANDLE_SELECT_PAGE_SIZE_VISABILITY:
      return { ...state, isPageSizeListOpened: !state.isPageSizeListOpened };
    case HANDLE_SELECT_ORDER_BY_LIST_VISABILITY:
      return { ...state, isOrderByListOpened: !state.isOrderByListOpened };
    case OPEN_PICTURE_DETAILS_POP_UP:
      return togglePopUpTargetToSelectedPicture(state, action);
    case CLOSE_PICTURE_DETAILS_POP_UP:
      return togglePopUpTargetToSelectedPicture(state, action);
    case SHOW_PICTURE_TITLE:
      return setIsPictureTitleShownProperty(state, action, true);
    case HIDE_PICTURE_TITLE:
      return setIsPictureTitleShownProperty(state, action, false);
    case RESET_QUERY_PARAM:
      return { ...state, queryParam: '' };

    default:
      return state;
  }
};
export default collectionReducer;
