import {
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
  props,
} from '@ngrx/store';

// counter.state.ts
// Initial State

export interface CounterState {
  counter: number;
  toggle: boolean;
}

const initialCounterState: CounterState = {
  counter: 0,
  toggle: false,
};

// counter.actions.ts
// Action Types
export const increment = createAction('increament');
export const decrement = createAction('decrement');
export const reset = createAction('reset');
export const customIncrement = createAction('customIncrement', props<{ value: number }>());
export const toggleCustomInput = createAction('toggleCustomInput');

// counter.reducer.ts
// Reducer Function
export const counterReducer = createReducer(
  initialCounterState,
  // Handle Increment Action
  on(increment, (state) => ({ ...state, counter: state.counter + 1 })),
  // Handle Decrement Action
  on(decrement, (state) => ({ ...state, counter: state.counter - 1 })),
  // Handle Reset Action
  on(reset, (state) => ({ ...state, counter: 0 })),
  // Handle Custom Increment Action
  on(customIncrement, (state, action) => ({
    ...state,
    counter: state.counter + action.value,
  })),
  // Handle Toggle Custom Input Action
  on(toggleCustomInput, (state) => ({ ...state, toggle: !state.toggle }))
);

//counter.selectors.ts
// Selector Functions

const getCounterState = createFeatureSelector<CounterState>('counter');

export const getCounter = createSelector(
  getCounterState,
  (counterState: CounterState) => counterState.counter
);

export const getToggle = createSelector(
  getCounterState,
  (counterState: CounterState) => counterState.toggle
);
