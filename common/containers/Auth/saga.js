import { all, takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

import * as constants from './constants';
import * as actions from './actions';

function* workerLogin(action) {
  try {
    let response = yield action.params.loginUser(
      action.params.user.email,
      action.params.user.password,
    );

    response = { data: { email: response.user.email, uid: response.user.uid } };
    yield actions.loginSuccess(response, action.params.remember);
  } catch (error) {
    yield put(actions.loginError(error));
  }
}

function* watchAll() {
  yield all([takeLatest(constants.LOGIN_REQUEST, workerLogin)]);
}

export default watchAll;
