/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect, useState } from 'react';

import { Switch, Route, withRouter } from 'react-router-dom';

import LoadingIndicator from 'common/components/LoadingIndicator';
import Auth from 'common/containers/Auth';
import AppLayout from 'common/containers/appLayout';
import { getUserData, clearStorage } from 'common/utils/localStorage';
import history from 'common/utils/history';
import * as routes from 'common/appConstants';

function App(props) {
  const [loading, setLoading] = useState(true);

  function onAppLoad() {
    const userData = getUserData();

    if (userData) {
      history.push(routes.LANDING);
    } else if (props.location.pathname.includes(routes.authRouts[0])) {
      history.push(props.location.pathname);
    } else {
      clearStorage();
      history.push(routes.authRouts[0]);
    }
    setLoading(false);
  }

  useEffect(() => {
    onAppLoad();
  }, []);
  return loading ? (
    <LoadingIndicator />
  ) : (
    <Switch>
      <Route exact path={routes.LANDING} component={AppLayout} />
      <Route path={routes.authRouts[0]} component={Auth} />
    </Switch>
  );
}

export default withRouter(App);
