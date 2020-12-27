import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectAuthState = state => state.auth || initialState;

export const makeSelectLoading = () =>
  createSelector(
    selectAuthState,
    state => state.loading,
  );

export const makeSelectError = () =>
  createSelector(
    selectAuthState,
    state => state.error,
  );
