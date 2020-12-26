import produce from 'immer';

import * as constants from './constants';

export const initialState = {
  data: {},
  loading: false,
  error: '',
};

const authReducer = produce((draft, action) => {
  switch (action.type) {
    case constants.LOGIN_REQUEST:
      draft.loading = true;
      draft.error = '';
      break;
    case constants.LOGIN_SUCCESS:
      draft.loading = false;
      draft.error = '';
      break;
    case constants.LOGIN_ERROR:
      draft.loading = false;
      draft.error = action.error.message;
      break;
    default:
      draft.initialState = draft.initialState;
      break;
  }
}, initialState);

export default authReducer;
