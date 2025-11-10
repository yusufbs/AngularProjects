import { Routes } from '@angular/router';
import { Home } from './home/home';
import { provideState } from '@ngrx/store';
import { coursesReducer } from './courses/state/courses.state';
import { AUTH_STATE, COUNTER_STATE, COURSES_STATE } from './constants';
import { AuthEffects, authReducer } from './auth/state/auth.state';
import { provideEffects } from '@ngrx/effects';
import { counterReducer } from './counter/states/counter.reducer';

export const routes: Routes = [
  { path: '', component: Home },
  {
    path: 'counter',
    loadChildren: () => import('./counter/counter.routes').then((m) => m.routes),
    providers: [provideState(COUNTER_STATE, counterReducer)],
  },
  {
    path: 'courses',
    loadChildren: () => import('./courses/courses.routes').then((m) => m.routes),
    providers: [provideState(COURSES_STATE, coursesReducer)],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.routes),
    providers: [provideState(AUTH_STATE, authReducer), provideEffects([AuthEffects])],
  },
];
