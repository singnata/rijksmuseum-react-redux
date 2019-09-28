import React from 'react';
import { connect } from 'react-redux';

function ErrorBoundary({ isError, children }) {
  if (isError) return <h1 className='error'>Something went wrong</h1>;
  return children;
}

const mapStateToProps = (state) => {
  return {
    isError: state.collectionState.isError,
  };
};

export default connect(mapStateToProps)(ErrorBoundary);
