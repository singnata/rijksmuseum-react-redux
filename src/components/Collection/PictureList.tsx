import React from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import GridListTile from '@material-ui/core/GridListTile';
import GridList from '@material-ui/core/GridList';

import Picture from './Picture';
import collectionStyles from './CollectionStyles';

const theme: Theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  overrides: {
    MuiGridList: {
      root: {
        width: '1300px',
        maxHeight: '600px',
      },
    },
  },
});

interface Picture {
  some?: string,
  id: string
}

interface PictureListProps {
  classes?: any;
  collection: {
    artObjects: Picture[]
  },

}

const PictureList = withStyles(collectionStyles)(({ classes, collection }: PictureListProps) => {
  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.collectionContainer}>
        <GridList spacing={20} cols={5} cellHeight={100}>
          {collection.artObjects.map((picture, index) => {
            return (
              <GridListTile key={picture.id}>
                <Picture picture={picture} />
              </GridListTile>
            )
          })}
        </GridList>
      </div>
    </MuiThemeProvider>
  );
});

const mapStateToProps = (state, ownState) => {
  return {
    collection: state.picturesState.pictureList,
    classes: ownState.classes,
  };
};

export default connect(mapStateToProps)(PictureList);
