import { Routes } from '@angular/router';
import { Home } from './home/home';
import { provideState } from '@ngrx/store';
import { counterReducer } from './counter/states/counter.state';
import { coursesReducer } from './courses/state/courses.state';
import { COUNTER_STATE, COURSES_STATE } from './constants';

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
];
