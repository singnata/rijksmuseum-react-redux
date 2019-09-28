import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { handleSearchParams } from './../actions/searchActions';
import { fetchCollection } from '../actions/fetchDataActions';
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

class App extends Component {
  componentDidMount() {
    const { pageSize, pageNumber, orderByParam, match, fetchCollection, handleSearchParams } = this.props;
    if (match.params.objectType) {
      const queryParam = match.params.objectType;
      handleSearchParams(queryParam);
      return fetchCollection(pageSize, pageNumber, orderByParam, queryParam);
    }
    fetchCollection();
  }

  handleBlurContent = () => {
    this.setState({
      shouldMainContentBeBlurred: !this.state.shouldMainContentBeBlurred,
    });
  };

  render() {
    console.log('render')
    const { classes, collection, isLoading, isMainContentBlurred } = this.props;

    const blurMainContent = isMainContentBlurred ? classes.isBlurred : null;
    const isThereCollection = collection.artObjects && collection.artObjects.length !== 0 && !isLoading;
    const pictureList = isThereCollection ? (
      <PictureList />
    ) : (
      <div className="no-found">No art object could be found by your query</div>
    );

    return (
      <Fragment>
        <div className={blurMainContent}>
          <HeaderTitle />
          {!isLoading && <Search />}

          {isLoading ? <CircularProgress className={classes.progress} color="secondary" /> : pictureList}

          <Pagination />
        </div>
      </Fragment>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    collection: state.collectionState.pictureList,
    isLoading: state.collectionState.isLoading,
    isMainContentBlurred: state.collectionState.isMainContentBlurred,
    pageSize: state.collectionState.pageSize,
    pageNumber: state.collectionState.pageNumber,
    orderByParam: state.collectionState.orderByParam,
  };
};
const mapDispatchToProps = (dispatch) => {
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
