declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    variant?: string;
  }
}

import * as React from 'react';
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

interface PictureProps {
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
  openPictureDetailsPopUp: typeof openPictureDetailsPopUp,
  showPictureTitle: typeof showPictureTitle,
  hidePictureTitle: typeof hidePictureTitle,
}

const Picture = withStyles(collectionStyles)(({ classes, picture, openPictureDetailsPopUp, showPictureTitle, hidePictureTitle }: PictureProps) => {
  const pictureTitle = picture.isPictureTitleShown ? classes.titleIsVisible : classes.titleIsHidden;
  const image = picture.hasImage ? (
    <img src={picture.headerImage.url} alt={picture.title} className={classes.pictureImage} />
  ) : (
      <div className={classes.noImage}>No image</div>
    );

  const handleOpenPopUp = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    openPictureDetailsPopUp({ selectedPicture: picture, popUpTarget: event.currentTarget });
  };

  const onMouseEnter = () => {
    showPictureTitle(picture);
  };

  const onMouseLeave = () => {
    hidePictureTitle(picture);
  };



  return (
    <React.Fragment>
      <div
        variant="contained"
        className={classes.pictureContainer}
        onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => handleOpenPopUp(event)}
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
    </React.Fragment>
  );
});

const mapStateToProps = (state, ownState) => {
  return {
    picture: ownState.picture,
    key: ownState.key,
    classes: ownState.classes,
    collection: state.picturesState.pictureList,
  };
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
  mapStateToProps,
  mapDispatchToProps
)(Picture);
