import React from 'react';

import { Switch, Route } from 'react-router-dom';

import * as routes from 'common/appConstants';

import LoginForm from './loginForm';

export default function index() {
  return (
    <Switch>
      <Route exact path={routes.authRouts[0]} component={LoginForm} />
    </Switch>
  );
}
