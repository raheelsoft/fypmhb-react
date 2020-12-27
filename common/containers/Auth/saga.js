import { all, takeLatest, put } from 'redux-saga/effects';

import * as constants from './constants';
import * as actions from './actions';
import { message } from 'antd';

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

function* workerResetPassword(action) {
  try {
    const response = yield action.params.resetPassword(action.params.email);
    yield put(actions.forgotPasswordSuccess());
    message.success('Email send successfully');
  } catch (error) {
    yield put(actions.forgotPasswordError(error));
  }
}

function* watchAll() {
  yield all([
    takeLatest(constants.LOGIN_REQUEST, workerLogin),
    takeLatest(constants.FORGOT_PASSWORD_REQUEST, workerResetPassword),
  ]);
}

export default watchAll;
