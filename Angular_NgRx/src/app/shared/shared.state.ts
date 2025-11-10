import { createAction, createFeatureSelector, createSelector, props } from '@ngrx/store';
import { createReducer, on } from '@ngrx/store';
import { SHARED_STATE } from '../constants';

// shared.state.ts
export interface SharedState {
  isLoading: boolean;
  errorMessage: string;
}

export const initialSharedState: SharedState = {
  isLoading: false,
  errorMessage: '',
};

// shared.actions.ts
export const setIsLoading = createAction('[Shared] Set Is Loading', props<{ value: boolean }>());

export const setErrorMessage = createAction(
  '[Shared] Set Error Message',
  props<{ message: string }>()
);

// shared.reducer.ts

export const sharedReducer = createReducer(
  initialSharedState,
  on(setIsLoading, (state, action) => {
    return { ...state, isLoading: action.value };
  }),
  on(setErrorMessage, (state, action) => {
    return { ...state, errorMessage: action.message };
  })
);

// shared.selectors.ts

const selectSharedState = createFeatureSelector<SharedState>(SHARED_STATE);

export const getIsLoading = createSelector(selectSharedState, (state) => state.isLoading);

export const getErrorMessage = createSelector(selectSharedState, (state) => state.errorMessage);
