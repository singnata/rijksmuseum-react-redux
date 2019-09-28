import React from 'react';
import { render } from 'react-dom';
import Router from './components/Router';
import { Provider } from 'react-redux';

import store from './store/index';
import './css/style.css';

render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.querySelector('#main')
);
