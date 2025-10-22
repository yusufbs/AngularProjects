import {
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

// counter.state.ts
// Initial State

export interface CounterState {
  counter: number;
}

const initialCounterState: CounterState = {
  counter: 0,
};

// counter.actions.ts
// Action Types
export const increment = createAction('increament');
export const decrement = createAction('decrement');
export const reset = createAction('reset');

// counter.reducer.ts
// Reducer Function
export const counterReducer = createReducer(
  initialCounterState,
  // Handle Increment Action
  on(increment, (state) => ({ ...state, counter: state.counter + 1 })),
  // Handle Decrement Action
  on(decrement, (state) => ({ ...state, counter: state.counter - 1 })),
  // Handle Reset Action
  on(reset, (state) => ({ ...state, counter: 0 }))
);

//counter.selectors.ts
// Selector Functions

const selectCounterState = createFeatureSelector<CounterState>('counter');

export const getCounter = createSelector(
  selectCounterState,
  (counterState: CounterState) => counterState.counter
);
