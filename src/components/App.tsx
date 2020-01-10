import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { handleSearchParams } from '../actions/searchActions';
import { fetchCollection } from '../actions/pictureActions';
import { AppState } from './../reducers/index';
import HeaderTitle from './Header/HeaderTitle';
import PictureList from './Collection/PictureList';
import Search from './Header/Search';
import Pagination from './Pagination/Pagination';

const styles = () => ({
  progress: {
    margin: '10% 50%',
  },
  isBlurred: {
    filter: 'blur(2px)',
  },
});

interface AppProps {
  collection: {
    artObjects: []
  }
  isLoading: boolean,
  isMainContentBlurred: boolean
  pageSize: number;
  pageNumber: number;
  orderByParam: string;
  match?: any;
  fetchCollection: typeof fetchCollection;
  classes: any;

  handleSearchParams: typeof handleSearchParams;
}

class App extends Component<AppProps> {
  componentDidMount() {
    const { pageSize, pageNumber, orderByParam, match, fetchCollection, handleSearchParams } = this.props;
    if (match.params.objectType) {
      const queryParam = match.params.objectType;
      handleSearchParams(queryParam);
      return fetchCollection(pageSize, pageNumber, orderByParam, queryParam);
    }
    fetchCollection();
  }

  render() {
    const { classes } = this.props;
    const { collection, isLoading, isMainContentBlurred } = this.props;

    const blurMainContent = isMainContentBlurred ? classes.isBlurred : null;
    const isThereCollection = collection.artObjects && collection.artObjects.length !== 0 && !isLoading;
    const pictureListL = isThereCollection ? (
      <PictureList />
    ) : (
        <div className="no-found">No art object could be found by your query</div>
      );

    return (
      <Fragment>
        <div className={blurMainContent}>
          <HeaderTitle />
          {!isLoading && <Search />}

          {isLoading ? <CircularProgress className={classes.progress} color="secondary" /> : pictureListL}

          <Pagination />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    collection: state.picturesState.pictureList,
    isLoading: state.picturesState.isLoading,
    isMainContentBlurred: state.picturesState.isMainContentBlurred,
    pageSize: state.paginationState.pageSize,
    pageNumber: state.paginationState.pageNumber,
    orderByParam: state.searchState.orderByParam,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      fetchCollection,
      handleSearchParams,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App));
