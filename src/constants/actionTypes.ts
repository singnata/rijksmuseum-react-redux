export const FETCH_COLLECTION_REQUEST = 'FETCH_COLLECTION_REQUEST';
export const FETCH_COLLECTION_FAILURE = 'FETCH_COLLECTION_FAILURE';
export const FETCH_COLLECTION_SUCCESS = 'FETCH_COLLECTION_SUCCESS';

export const FETCH_PICTURE_INFO_REQUEST = 'FETCH_PICTURE_INFO_REQUEST';
export const FETCH_PICTURE_INFO_FAILURE = 'FETCH_PICTURE_INFO_FAILURE';
export const FETCH_PICTURE_INFO_SUCCESS = 'FETCH_PICTURE_INFO_SUCCESS';

export const HANDLE_PAGE_SIZE = 'HANDLE_PAGE_SIZE';
export const HANDLE_PAGE_NUMBER = 'HANDLE_PAGE_NUMBER';
export const HANDLE_SEARCH = 'HANDLE_SEARCH';
export const HANDLE_ORDER = 'HANDLE_ORDER';
export const RESET_QUERY_PARAM = 'RESET_QUERY_PARAM';

export const HANDLE_SELECT_PAGE_SIZE_VISABILITY = 'HANDLE_SELECT_PAGE_SIZE_VISABILITY';
export const HANDLE_SELECT_ORDER_BY_LIST_VISABILITY = 'HANDLE_SELECT_ORDER_BY_LIST_VISABILITY';

export const OPEN_PICTURE_DETAILS_POP_UP = 'OPEN_PICTURE_DETAILS_POP_UP';
export const CLOSE_PICTURE_DETAILS_POP_UP = 'CLOSE_PICTURE_DETAILS_POP_UP';
export const SHOW_PICTURE_TITLE = 'SHOW_PICTURE_TITLE';
export const HIDE_PICTURE_TITLE = 'HIDE_PICTURE_TITLE';

interface FetchCollectionRequestAction {
  type: typeof FETCH_COLLECTION_REQUEST,
}
interface FetchCollectionSuccessAction {
  type: typeof FETCH_COLLECTION_SUCCESS,
  pictureList?: []
};
interface FetchCollectionFailedAction {
  type: typeof FETCH_COLLECTION_FAILURE,
};
export type FetchCollectionTypes = FetchCollectionRequestAction | FetchCollectionSuccessAction | FetchCollectionFailedAction

interface FetchPictureInfoRequestAction {
  type: typeof FETCH_PICTURE_INFO_REQUEST,
}
interface FetchPictureInfoSuccessAction {
  type: typeof FETCH_PICTURE_INFO_SUCCESS,
  picture: {} | null
};
interface FetchPictureInfoFailedAction {
  type: typeof FETCH_PICTURE_INFO_FAILURE,
};
export type FetchPictureInfoTypes = FetchPictureInfoRequestAction | FetchPictureInfoSuccessAction | FetchPictureInfoFailedAction

interface ShowPictureTitleAction {
  type: typeof SHOW_PICTURE_TITLE,
  picture: {},
  value: boolean
}
interface HidePictureTitleAction {
  type: typeof HIDE_PICTURE_TITLE,
  picture: {},
  value: boolean
}
export type SetIsPictureTitleShownPropertyTypes = ShowPictureTitleAction | HidePictureTitleAction;

interface OpenPictureDetailsPopUpAction {
  type: typeof CLOSE_PICTURE_DETAILS_POP_UP,
  payload: {
    selectedPicture: {},
    popUpTarget: any
  }
}
interface ClosePictureDetailsPopUpAction {
  type: typeof OPEN_PICTURE_DETAILS_POP_UP,
  payload: {
    selectedPicture: {},
    popUpTarget: any
  }
}
export type TogglePopUpTargetToSelectedPictureTypes = OpenPictureDetailsPopUpAction | ClosePictureDetailsPopUpAction

interface HandleOrderByParamsAction {
  type: typeof HANDLE_ORDER,
  orderByParam: ''
}
interface HandleSearchParamsAction {
  type: typeof HANDLE_SEARCH,
  queryParam: ''
}
interface ResetQueryParamAction {
  type: typeof RESET_QUERY_PARAM
}
interface HandleSelectOrderByVisabilityAction {
  type: typeof HANDLE_SELECT_ORDER_BY_LIST_VISABILITY
}
export type SearchTypes = HandleOrderByParamsAction | HandleSearchParamsAction | ResetQueryParamAction | HandleSelectOrderByVisabilityAction

interface HandleSelectPageSizeVisabilityAction {
  type: typeof HANDLE_SELECT_PAGE_SIZE_VISABILITY
}
interface HandlePageSizeAction {
  type: typeof HANDLE_PAGE_SIZE,
  pageSize: number
}
interface HandlePageNumberAction {
type: typeof HANDLE_PAGE_NUMBER,
pageNumber: number
}
export type PaginationTypes = HandleSelectPageSizeVisabilityAction | HandlePageSizeAction | HandlePageNumberAction


export interface PicturesState {
  isError: boolean,
  pictureList: {} | undefined,
  isLoading: boolean,
  isMainContentBlurred: boolean,
  picture: {} | null,
}

export interface SearchState {
  queryParam: string,
  orderByParam: string,
  isOrderByListOpened: boolean,
}

export interface PaginationState{
  pageNumber: number,
  pageSize: number,
  isPageSizeListOpened: boolean,
}



