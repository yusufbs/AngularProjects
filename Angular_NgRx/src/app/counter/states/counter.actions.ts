import { createAction, props } from '@ngrx/store';

export const increment = createAction('[counter] Increament');
export const decrement = createAction('[counter] Decrement');
export const reset = createAction('[counter] Reset');
export const customIncrement = createAction(
  '[counter] Custom Increment',
  props<{ value: number }>()
);
export const toggleCustomInput = createAction('[counter] Toggle Custom Input');
