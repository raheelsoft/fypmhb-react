/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

export const selectRouter = state => state.router;

// const makeSelectCurrentUser = () =>
//   createSelector(
//     selectGlobal,
//     globalState => globalState.currentUser,
//   );
