import { createAction, createFeatureSelector, createSelector, props } from '@ngrx/store';
import { createReducer, on } from '@ngrx/store';
import { SHARED_STATE } from '../constants';

// shared.state.ts
export interface SharedState {
  isLoading: boolean;
}

export const initialSharedState: SharedState = {
  isLoading: false,
};

// shared.actions.ts
export const setIsLoading = createAction(
  '[Shared] Set Is Loading',
  props<{ isLoading: boolean }>()
);

// shared.reducer.ts

export const sharedReducer = createReducer(
  initialSharedState,
  on(setIsLoading, (state, action) => {
    return { ...state, isLoading: action.isLoading };
  })
);

// shared.selectors.ts

const selectSharedState = createFeatureSelector<SharedState>(SHARED_STATE);

export const getIsLoading = createSelector(selectSharedState, (state) => state.isLoading);
