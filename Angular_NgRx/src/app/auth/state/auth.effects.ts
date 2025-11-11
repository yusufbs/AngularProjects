import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap, map, catchError, of, tap } from 'rxjs';
import { setIsLoading, setErrorMessage } from '../../shared/shared.state';
import { AppState } from '../../store/app.state';
import { AuthService } from '../services/auth.service';
import { loginStartAction, loginSuccessAction } from './auth.actions';

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
        this.store.dispatch(setIsLoading({ value: true }));
        return this.authService.login(email, password).pipe(
          map((user) => {
            this.store.dispatch(setIsLoading({ value: false }));
            return loginSuccessAction({ user });
          }),
          catchError((error) => {
            this.store.dispatch(setIsLoading({ value: false }));
            const errorMessage = this.authService.getErrorMessage(error);
            return of(setErrorMessage({ message: errorMessage }));
          })
        );
      })
    );
  });

  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginSuccessAction),
        tap(() => {
          this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );
}
