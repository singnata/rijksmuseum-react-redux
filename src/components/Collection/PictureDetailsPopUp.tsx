import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { closePictureDetailsPopUp } from '../../actions/pictureActions';

import collectionStyles from './CollectionStyles';

interface PictureDetilsPopUpProps {
  classes?: any;
  picture: {
    isPictureTitleShown: boolean,
    hasImage: any,
    title: string,
    headerImage: {
      url: string
    },
    longTitle: string,
    popUpTarget: any,
    id: string,
    productionPlaces: [],
    principalOrFirstMaker: string,
    objectNumber: string
  },
  closePictureDetailsPopUp: typeof closePictureDetailsPopUp,
}

const PictureDetailsPopUp = withStyles(collectionStyles)(({ classes, picture, closePictureDetailsPopUp }: PictureDetilsPopUpProps) => {
  const isThereProductionPlace = picture.productionPlaces && picture.productionPlaces.length !== 0;
  const productionPlace = picture.productionPlaces.map((item, index) => {
    return <span key={index}>{item} </span>;
  });

  const pictureMaker = picture.principalOrFirstMaker && (
    <div>
      <span>Principal or first maker: </span>
      {picture.principalOrFirstMaker}
    </div>
  );

  const image = picture.hasImage ? (
    <div className={classes.pictureImageContainer}>
      <img src={picture.headerImage.url} alt={picture.title} />
    </div>
  ) : (
      <div className={classes.noImage}>No image</div>
    );

  const handleClosePopUp = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    closePictureDetailsPopUp({ selectedPicture: picture, popUpTarget: null });
  };

  return (
    <div className={classes.pictureDetailsContainer}>
      {image}
      <div>{picture.longTitle}</div>
      {pictureMaker}
      <div>
        <span>Object number: </span>
        {picture.objectNumber}
      </div>
      <div>
        {isThereProductionPlace && (
          <span>
            Production place: <span>{productionPlace}</span>
          </span>
        )}
      </div>
      <div className={classes.buttonsContainer}>
        <div className={`${classes.button} ${classes.seeMoreButton}`}>
          <Link to={`/picture/${picture.objectNumber}`} target="_blank">
            View more details
          </Link>
        </div>
        <div className={`${classes.button} ${classes.closeButton}`}>
          <button type="submit" onClick={(event) => handleClosePopUp(event)}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
});

const mapStateToProps = (state, ownState) => {
  return {
    picture: ownState.picture,
    classes: ownState.classes,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      closePictureDetailsPopUp,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PictureDetailsPopUp);
