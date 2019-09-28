import {
  FETCH_COLLECTION_REQUEST,
  FETCH_COLLECTION_SUCCESS,
  FETCH_COLLECTION_FAILURE,
  FETCH_PICTURE_INFO_REQUEST,
  FETCH_PICTURE_INFO_FAILURE,
  FETCH_PICTURE_INFO_SUCCESS,
} from '../constants/actionTypes';

const fetchCollectionRequest = () => {
  return {
    type: FETCH_COLLECTION_REQUEST,
  };
};

const fetchCollectionSuccess = (pictureList) => {
  return {
    type: FETCH_COLLECTION_SUCCESS,
    pictureList,
  };
};

const fetchCollectionFailed = () => {
  return {
    type: FETCH_COLLECTION_FAILURE,
  };
};

export const fetchCollection = (pageSize = 50, pageNumber = 1, orderByParam = '', queryParam = '') => {
  const baseUrl = `https://www.rijksmuseum.nl/api/en/collection?key=nMG7xRY4&format=json&`;
  const getCollectionEndpoint = `${baseUrl}ps=${pageSize}&p=${pageNumber}&s=${orderByParam}&q=${queryParam}`;

  return (dispatch) => {
    dispatch(fetchCollectionRequest());

    fetch(getCollectionEndpoint)
      .then((response) => response.json())
      .then((pictureList) => {
        dispatch(fetchCollectionSuccess(pictureList));
      })
      .catch(() => {
        dispatch(fetchCollectionFailed());
      });
  };
};

const fetchPictureInfoRequest = () => {
  return {
    type: FETCH_PICTURE_INFO_REQUEST,
  };
};

const fetchPictureInfoSuccess = (picture) => {
  return {
    type: FETCH_PICTURE_INFO_SUCCESS,
    picture,
  };
};

const fetchPictureInfoFailed = () => {
  return {
    type: FETCH_PICTURE_INFO_FAILURE,
  };
};

export const fetchPictureInfo = (objectNumber) => {
  const getPictureInfoEndpoint = `https://www.rijksmuseum.nl/api/en/collection/${objectNumber}?key=nMG7xRY4&format=json&`;

  return (dispatch) => {
    dispatch(fetchPictureInfoRequest());

    fetch(getPictureInfoEndpoint)
      .then((response) => response.json())
      .then((picture) => {
        dispatch(fetchPictureInfoSuccess(picture));
      })
      .catch(() => {
        dispatch(fetchPictureInfoFailed());
      });
  };
};
