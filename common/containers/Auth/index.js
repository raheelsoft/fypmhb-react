import React from 'react';

import { Switch, Route } from 'react-router-dom';

import * as routes from 'common/appConstants';

import LoginForm from './loginForm';
import ResetPassword from './resetPassword/loadable';

export default function index() {
  return (
    <Switch>
      <Route exact path={routes.authRouts[0]} component={LoginForm} />
      <Route path={routes.authRouts[2]} component={ResetPassword} />
    </Switch>
  );
}
