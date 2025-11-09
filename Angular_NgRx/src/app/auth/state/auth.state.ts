import {
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
  props,
  Store,
} from '@ngrx/store';
import { User } from '../../model/user.model';
import { AUTH_STATE } from '../../constants';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { exhaustMap, map, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AppState } from '../../store/app.state';
import { setIsLoading } from '../../shared/shared.state';

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
  private router: Router = inject(Router);
  private store: Store<AppState> = inject(Store<AppState>);

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStartAction),
      exhaustMap(({ email, password }) => {
        this.store.dispatch(setIsLoading({ isLoading: true }));
        return this.authService.login(email, password).pipe(
          map((user) => {
            this.store.dispatch(setIsLoading({ isLoading: false }));
            return loginSuccessAction({ user });
          })
        );
      })
    );
  });

  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginSuccessAction),
        tap((action) => {
          this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );
}
