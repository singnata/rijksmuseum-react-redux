import {
  PicturesState,
  FetchCollectionTypes,
  FetchPictureInfoTypes,
  TogglePopUpTargetToSelectedPictureTypes,
  SetIsPictureTitleShownPropertyTypes,
  FETCH_COLLECTION_REQUEST,
  FETCH_COLLECTION_SUCCESS,
  FETCH_COLLECTION_FAILURE,
  FETCH_PICTURE_INFO_REQUEST,
  FETCH_PICTURE_INFO_FAILURE,
  FETCH_PICTURE_INFO_SUCCESS,
  OPEN_PICTURE_DETAILS_POP_UP,
  CLOSE_PICTURE_DETAILS_POP_UP,
  SHOW_PICTURE_TITLE,
  HIDE_PICTURE_TITLE,
} from '../constants/actionTypes';

const initialState: PicturesState = {
  isError: false,
  pictureList: {},
  isLoading: false,
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

const picturesReducer = (state = initialState, action: FetchCollectionTypes | SetIsPictureTitleShownPropertyTypes | TogglePopUpTargetToSelectedPictureTypes | FetchPictureInfoTypes): PicturesState => {
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
    case OPEN_PICTURE_DETAILS_POP_UP:
      return togglePopUpTargetToSelectedPicture(state, action);
    case CLOSE_PICTURE_DETAILS_POP_UP:
      return togglePopUpTargetToSelectedPicture(state, action);
    case SHOW_PICTURE_TITLE:
      return setIsPictureTitleShownProperty(state, action, true);
    case HIDE_PICTURE_TITLE:
      return setIsPictureTitleShownProperty(state, action, false);

    default:
      return state;
  }
};
export default picturesReducer;
