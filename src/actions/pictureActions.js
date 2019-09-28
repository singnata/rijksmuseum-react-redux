import {
  OPEN_PICTURE_DETAILS_POP_UP,
  CLOSE_PICTURE_DETAILS_POP_UP,
  SHOW_PICTURE_TITLE,
  HIDE_PICTURE_TITLE,
} from '../constants/actionTypes';

export const openPictureDetailsPopUp = (payload) => (dispatch) => {
  dispatch({ type: OPEN_PICTURE_DETAILS_POP_UP, payload });
};

export const closePictureDetailsPopUp = (payload) => (dispatch) => {
  dispatch({ type: CLOSE_PICTURE_DETAILS_POP_UP, payload });
};

export const showPictureTitle = (picture) => (dispatch) => {
  dispatch({ type: SHOW_PICTURE_TITLE, picture });
};

export const hidePictureTitle = (picture) => (dispatch) => {
  dispatch({ type: HIDE_PICTURE_TITLE, picture });
};


