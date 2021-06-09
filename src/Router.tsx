import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Example from '@pages/Example';
import PageNotFound from '@pages/PageNotFound';

const ClientRouter: JSX.Element = (
  <>
    <Router>
      <Switch>
        <Route exact path="/" component={Example} />
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  </>
);

export default ClientRouter;
