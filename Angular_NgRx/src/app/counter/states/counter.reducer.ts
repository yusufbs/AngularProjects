import { createReducer, on } from '@ngrx/store';
import { initialCounterState } from './counter.state';
import { customIncrement, decrement, increment, reset, toggleCustomInput } from './counter.actions';

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
