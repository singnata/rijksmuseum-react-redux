import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Popover from '@material-ui/core/Popover';
import PictureDetailsPopUp from './PictureDetailsPopUp';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { openPictureDetailsPopUp, showPictureTitle, hidePictureTitle } from '../../actions/pictureActions';
import collectionStyles from './CollectionStyles';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  overrides: {
    MuiPopover: {
      paper: {
        top: '50% !important',
        left: '50% !important',
        width: '800px',
        height: '470px',
        marginLeft: '-400px',
        marginTop: '-300px',
      },
    },
  },
});

const Picture = ({
  classes,
  picture,
  openPictureDetailsPopUp,
  showPictureTitle,
  hidePictureTitle,
  selectedPicture,
  show,
}) => {
  const pictureTitle = picture.isPictureTitleShown ? classes.titleIsVisible : classes.titleIsHidden;
  const image = picture.hasImage ? (
    <img src={picture.headerImage.url} alt={picture.title} className={classes.pictureImage} />
  ) : (
    <div className={classes.noImage}>No image</div>
  );

  const handleOpenPopUp = (event) => {
    openPictureDetailsPopUp({ selectedPicture: picture, popUpTarget: event.currentTarget });
  };

  const onMouseEnter = () => {
    showPictureTitle(picture);
  };

  const onMouseLeave = () => {
    hidePictureTitle(picture);
  };

  return (
    <Fragment>
      <div
        variant="contained"
        className={classes.pictureContainer}
        onClick={(event) => handleOpenPopUp(event)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {image}
        <GridListTileBar className={pictureTitle} title={picture.longTitle} />
      </div>

      <MuiThemeProvider theme={theme}>
        <Popover
          open={Boolean(picture.popUpTarget)}
          anchorEl={picture.popUpTarget}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
        >
          <PictureDetailsPopUp picture={picture} />
        </Popover>
      </MuiThemeProvider>
    </Fragment>
  );
};

Picture.propTypes = {
  classes: PropTypes.object.isRequired,
  openPictureDetailsPopUp: PropTypes.func,
  showPictureTitle: PropTypes.func,
  hidePictureTitle: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      openPictureDetailsPopUp,
      showPictureTitle,
      hidePictureTitle,
    },
    dispatch
  );
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(collectionStyles)(Picture));
