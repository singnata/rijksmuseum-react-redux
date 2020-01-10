import React from 'react';
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
} from '../../actions/searchActions';
import { fetchCollection } from '../../actions/pictureActions';
import headerStyles from './HeaderStyles';

export type onChangeOrderByInputParam = React.SyntheticEvent<{ value: string }>;

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

interface SearchProps {
  classes?: any;
  isOrderByListOpened: boolean,
  handleSelectOrderByVisability: typeof handleSelectOrderByVisability,
  handleOrderByParams: typeof handleOrderByParams,
  pageNumber: number,
  pageSize: number,
  queryParam: string,
  orderByParam: string,
  fetchCollection: typeof fetchCollection,
  handleSearchParams: typeof handleSearchParams,
  resetQueryParam: typeof resetQueryParam
}

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
}: SearchProps) => {

  const onChangeOrderByInput = (event: React.ChangeEvent<{ value: unknown | string }>) => {
    event.preventDefault();
    const orderByParam = event.target.value as string;
    handleOrderByParams(orderByParam);
    fetchCollection(pageSize, pageNumber, orderByParam, queryParam);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchCollection(pageSize, pageNumber, orderByParam, queryParam);
  };

  const onChangeSearchInput = (event: React.ChangeEvent<{ value: unknown | string }>) => {
    event.preventDefault();
    handleSearchParams(event.target.value);
  };

  const handleResetSearchQueryParam = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    resetQueryParam();
    fetchCollection(pageSize, pageNumber, orderByParam, '');
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



const mapStateToProps = (state) => {
  return {
    pageNumber: state.searchState.pageNumber,
    pageSize: state.searchState.pageSize,
    queryParam: state.searchState.queryParam,
    orderByParam: state.searchState.orderByParam,
    isOrderByListOpened: state.searchState.isOrderByListOpened,
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
