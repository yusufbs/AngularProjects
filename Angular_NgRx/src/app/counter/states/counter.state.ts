import {
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
  props,
} from '@ngrx/store';
import { COUNTER_STATE } from '../../constants';

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
export const increment = createAction('[counter] Increament');
export const decrement = createAction('[counter] Decrement');
export const reset = createAction('[counter] Reset');
export const customIncrement = createAction(
  '[counter] Custom Increment',
  props<{ value: number }>()
);
export const toggleCustomInput = createAction('[counter] Toggle Custom Input');

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

const getCounterState = createFeatureSelector<CounterState>(COUNTER_STATE);

export const getCounter = createSelector(
  getCounterState,
  (counterState: CounterState) => counterState.counter
);

export const getToggle = createSelector(
  getCounterState,
  (counterState: CounterState) => counterState.toggle
);
