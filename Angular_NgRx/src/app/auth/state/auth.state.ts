import {
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
  props,
} from '@ngrx/store';
import { User } from '../../model/user.model';
import { AUTH_STATE } from '../../constants';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { exhaustMap, map } from 'rxjs';

// auth.state.ts
export interface AuthState {
  user: User | null;
}
export const initialAuthState: AuthState = {
  user: null,
};

// auth.actions.ts
export const loginStartAction = createAction(
  '[Auth] Login Start',
  props<{ email: string; password: string }>()
);

export const loginSuccessAction = createAction('[Auth] Login Success', props<{ user: User }>());

// auth.reducer.ts
export const authReducer = createReducer(
  initialAuthState,
  on(loginSuccessAction, (state, action) => {
    console.log('Login Success Action Triggered', action.user);
    return { ...state, user: action.user };
  })
);

// auth.selectors.ts
const selectAuthFeature = createFeatureSelector<AuthState>(AUTH_STATE);

export const getLoggedInUser = createSelector(selectAuthFeature, (state) => state?.user);

// auth.effects.ts
@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService: AuthService = inject(AuthService);

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStartAction),
      exhaustMap(({ email, password }) => {
        return this.authService
          .login(email, password)
          .pipe(map((user) => loginSuccessAction({ user })));
      })
    );
  });
}
