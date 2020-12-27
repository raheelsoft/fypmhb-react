import * as routes from 'common/appConstants';

import { setUserData } from 'utils/localStorage';
import history from 'utils/history';

import * as constants from './constants';

export function loginRequest(params) {
  return {
    type: constants.LOGIN_REQUEST,
    params,
  };
}

export function loginSuccess(payload, remember) {
  setUserData(payload.data, remember);
  history.push(routes.LANDING);
  return {
    type: constants.LOGIN_SUCCESS,
    payload,
  };
}

export function loginError(error) {
  return {
    type: constants.LOGIN_ERROR,
    error,
  };
}

export function forgotPasswordRequest(params) {
  return {
    type: constants.FORGOT_PASSWORD_REQUEST,
    params,
  };
}

export function forgotPasswordSuccess() {
  return {
    type: constants.FORGOT_PASSWORD_SUCCESS,
  };
}

export function forgotPasswordError(error) {
  return {
    type: constants.FORGOT_PASSWORD_ERROR,
    error,
  };
}
