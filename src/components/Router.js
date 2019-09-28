import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import PictureDetails from './PictureDetails/PictureDetails';
import ErrorBoundary from './ErrorBoundary';

const Router = () => (
  <BrowserRouter>
    <ErrorBoundary>
      <Switch>
        <Route exact path="/:objectType?" render={(props) => <App {...props} />} />
        <Route exact path="/picture/:objectNumber" render={(props) => <PictureDetails {...props} />} />
      </Switch>
    </ErrorBoundary>
  </BrowserRouter>
);

export default Router;
