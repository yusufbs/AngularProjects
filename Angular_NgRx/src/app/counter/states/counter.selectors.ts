import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CounterState } from './counter.state';
import { COUNTER_STATE } from '../../constants';

const getCounterState = createFeatureSelector<CounterState>(COUNTER_STATE);

export const getCounter = createSelector(
  getCounterState,
  (counterState: CounterState) => counterState.counter
);

export const getToggle = createSelector(
  getCounterState,
  (counterState: CounterState) => counterState.toggle
);
