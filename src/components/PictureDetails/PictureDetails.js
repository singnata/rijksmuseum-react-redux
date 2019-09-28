import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchPictureInfo } from '../../actions/fetchDataActions';
import pictureDetailsStyles from './PictureDetailsStyles';

class PictureDetails extends Component {
  componentDidMount() {
    this.getPictureInfo();
  }

  getPictureInfo = () => {
    const objectNumber = this.props.match.params.objectNumber;
    this.props.fetchPictureInfo(objectNumber);
  };

  render() {
    const { classes, picture, isLoading } = this.props;

    const isThereMaterial = picture && picture.artObject.materials && picture.artObject.materials.length !== 0;

    const isThereObjectType = picture && picture.artObject.objectTypes && picture.artObject.objectTypes.length !== 0;

    const image =
      picture && picture.artObject.hasImage ? (
        <div className={classes.pictureImageContainer}>
          <img src={picture.artObject.webImage.url} alt={picture.title} />
        </div>
      ) : (
        <div className={classes.noImage}>No image</div>
      );

    if (isLoading) {
      return <CircularProgress className={classes.progress} color="secondary" />;
    }
    return (
      <div className={classes.pictureDetailsContainer}>
        {picture && (
          <div>
            {image}
            <div className={classes.pictureInfo}>
              <span className={classes.title}>Title: </span> {picture.artObject.longTitle}
            </div>
            <div className={classes.pictureInfo}>
              <span className={classes.title}>Description: </span> {picture.artObject.description}
            </div>
            <div className={classes.pictureInfo}>
              <span className={classes.title}>Principal or first maker: </span>
              {picture.artObject.principalOrFirstMaker}
            </div>
            <div className={classes.pictureInfo}>
              {isThereMaterial && <span className={classes.title}>Materials: </span>}
              {isThereMaterial &&
                picture.artObject.materials.map((material, index) => <span key={index}>{material} </span>)}
            </div>
            <div className={classes.pictureInfo}>
              <span className={classes.title}>Dating: </span>
              {picture.artObject.dating.presentingDate}
            </div>
            <div className={classes.pictureInfo}>
              {isThereObjectType && <span className={classes.title}>Object types: </span>}
              {isThereObjectType &&
                picture.artObject.objectTypes.map((objectType, index) => {
                  return (
                    <span key={index}>
                      <Link to={`/${objectType}`} target="_blank">
                        {objectType}
                      </Link>
                    </span>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    );
  }
}

pictureDetailsStyles.propTypes = {
  classes: PropTypes.object.isRequired,
  picture: PropTypes.object.object,
  isLoading: PropTypes.object.bool,
};

const mapStateToProps = (state) => {
  return {
    picture: state.collectionState.picture,
    isLoading: state.collectionState.isLoading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      fetchPictureInfo,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(pictureDetailsStyles)(PictureDetails));
