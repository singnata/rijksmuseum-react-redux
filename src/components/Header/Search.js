import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  handleSelectOrderByVisability,
  handleOrderByParams,
  handleSearchParams,
  resetQueryParam,
} from './../../actions/searchActions';
import { fetchCollection } from '../../actions/fetchDataActions';
import headerStyles from './HeaderStyles';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  overrides: {
    MuiListItem: {
      root: {
        fontFamily: 'inherit !important',
      },
    },
    MuiInputBase: {
      root: {
        fontFamily: 'inherit',
      },
    },
  },
});

const Search = ({
  classes,
  isOrderByListOpened,
  handleSelectOrderByVisability,
  handleOrderByParams,
  pageNumber,
  pageSize,
  queryParam,
  orderByParam,
  fetchCollection,
  handleSearchParams,
  resetQueryParam,
}) => {
  const onChangeOrderByInput = (event) => {
    event.preventDefault();
    const orderByParam = event.target.value;
    handleOrderByParams(orderByParam);
    fetchCollection(pageSize, pageNumber, orderByParam, queryParam);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchCollection(pageSize, pageNumber, orderByParam, queryParam);
  };

  const onChangeSearchInput = (event) => {
    event.preventDefault();
    handleSearchParams(event.target.value);
  };

  const handleResetSearchQueryParam = (event) => {
    event.preventDefault();
    resetQueryParam();
    fetchCollection();
  };

  return (
    <div className={classes.searchContainer}>
      <div className={classes.orderByFormContainer}>
        <form autoComplete="off">
          <MuiThemeProvider theme={theme}>
            <FormControl className={classes.formControl}>
              <InputLabel className={classes.inputLabel} htmlFor="filter">
                Order by:
              </InputLabel>
              <Select
                open={isOrderByListOpened}
                onClose={handleSelectOrderByVisability}
                onOpen={handleSelectOrderByVisability}
                value={orderByParam}
                onChange={(event) => onChangeOrderByInput(event)}
                inputProps={{
                  id: 'filter',
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="relevance">Relevance</MenuItem>
                <MenuItem value="objecttype">Object type</MenuItem>
                <MenuItem value="chronologic">Chronologic</MenuItem>
                <MenuItem value="achronologic">Achronologic</MenuItem>
                <MenuItem value="artist">Artist</MenuItem>
                <MenuItem value="artistdesc">Artist desc</MenuItem>
              </Select>
            </FormControl>
          </MuiThemeProvider>
        </form>
      </div>
      <div className={classes.queryParamFormContainer}>
        <form onSubmit={(event) => handleSubmit(event)}>
          <input placeholder="Search keyword..." onChange={(event) => onChangeSearchInput(event)} value={queryParam} />
          <button type="button" className={classes.clearButton} onClick={(event) => handleResetSearchQueryParam(event)}>
            <ClearIcon />
          </button>
          <Button className={classes.searchButton} type="submit">
            Search
          </Button>
        </form>
      </div>
    </div>
  );
};

Search.propTypes = {
  classes: PropTypes.object.isRequired,
  isOrderByListOpened: PropTypes.bool,
  handleSelectOrderByVisability: PropTypes.func,
  handleOrderByParams: PropTypes.func,
  pageNumber: PropTypes.number,
  pageSize: PropTypes.number,
  queryParam: PropTypes.string,
  orderByParam: PropTypes.string,
  fetchCollection: PropTypes.func,
  handleSearchParams: PropTypes.func,
  resetQueryParam: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    pageNumber: state.collectionState.pageNumber,
    pageSize: state.collectionState.pageSize,
    queryParam: state.collectionState.queryParam,
    orderByParam: state.collectionState.orderByParam,
    isOrderByListOpened: state.collectionState.isOrderByListOpened,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      handleSelectOrderByVisability,
      handleOrderByParams,
      fetchCollection,
      handleSearchParams,
      resetQueryParam,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(headerStyles)(Search));
