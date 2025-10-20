import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Counter } from './counter/counter';
import { Courses } from './courses/courses';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'counter', component: Counter },
  { path: 'courses', component: Courses },
];
