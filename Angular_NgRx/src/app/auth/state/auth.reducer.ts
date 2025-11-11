import { createReducer, on } from '@ngrx/store';
import { loginSuccessAction, signupSuccessAction } from './auth.actions';
import { initialAuthState } from './auth.state';

export const authReducer = createReducer(
  initialAuthState,
  on(loginSuccessAction, (state, action) => {
    return { ...state, user: action.user };
  }),
  on(signupSuccessAction, (state, action) => {
    return { ...state, user: action.user };
  })
);
