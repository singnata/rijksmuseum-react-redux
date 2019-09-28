import React, { Fragment } from 'react';
import ReactPaginate from 'react-paginate';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { handlePageSize, handlePageNumber, handleSelectPageSizeVisability } from './../../actions/paginationActions';
import { fetchCollection } from '../../actions/fetchDataActions';
import paginationStyles from './PaginationStyles';

const Pagination = ({
  classes,
  pageNumber,
  pageSize,
  handlePageSize,
  fetchCollection,
  orderByParam,
  queryParam,
  handlePageNumber,
  handleSelectPageSizeVisability,
  isPageSizeListOpened,
}) => {
  const onChangePageSize = (event) => {
    const pageSize = event.target.value;
    handlePageSize(pageSize);
    fetchCollection(pageSize, pageNumber, orderByParam, queryParam);
  };

  const onChangePageNumber = (data) => {
    const pageNumber = data.selected + 1;
    handlePageNumber(pageNumber);
    fetchCollection(pageSize, pageNumber, orderByParam, queryParam);
  };

  // TODO
  const pageCount = 200;

  return (
    <Fragment>
      {pageCount > 1 && (
        <div className={classes.footerContainer}>
          <div className={classes.pageSizeContainer}>
            <form autoComplete="off">
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="page-size">Page size</InputLabel>
                <Select
                  open={isPageSizeListOpened}
                  onClose={handleSelectPageSizeVisability}
                  onOpen={handleSelectPageSizeVisability}
                  value={pageSize}
                  onChange={onChangePageSize}
                  inputProps={{
                    id: 'page-size',
                  }}
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                  <MenuItem value={100}>100</MenuItem>
                </Select>
              </FormControl>
            </form>
          </div>
          <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            marginPagesDisplayed={2}
            onPageChange={onChangePageNumber}
            containerClassName={classes.paginationContainer}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
            forcePage={pageNumber - 1}
            pageCount={pageCount}
          />
        </div>
      )}
    </Fragment>
  );
};

Pagination.propTypes = {
  classes: PropTypes.object.isRequired,
  pageNumber: PropTypes.number,
  pageSize: PropTypes.number,
  queryParam: PropTypes.string,
  orderByParam: PropTypes.string,
  isPageSizeListOpened: PropTypes.bool,
  fetchCollection: PropTypes.func,
  handlePageSize: PropTypes.func,
  handlePageNumber: PropTypes.func,
  handleSelectPageSizeVisability: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    pageNumber: state.collectionState.pageNumber,
    pageSize: state.collectionState.pageSize,
    queryParam: state.collectionState.queryParam,
    orderByParam: state.collectionState.orderByParam,
    isPageSizeListOpened: state.collectionState.isPageSizeListOpened,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      fetchCollection,
      handlePageSize,
      handlePageNumber,
      handleSelectPageSizeVisability,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(paginationStyles)(Pagination));
