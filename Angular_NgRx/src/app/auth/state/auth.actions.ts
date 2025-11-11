import { createAction, props } from '@ngrx/store';
import { User } from '../../model/user.model';

export const loginStartAction = createAction(
  '[Auth] Login Start',
  props<{ email: string; password: string }>()
);

export const loginSuccessAction = createAction('[Auth] Login Success', props<{ user: User }>());

export const signupStartAction = createAction(
  '[Auth] Signup Start',
  props<{ email: string; password: string }>()
);

export const signupSuccessAction = createAction('[Auth] Signup Success', props<{ user: User }>());
