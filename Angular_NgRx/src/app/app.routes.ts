import { Routes } from '@angular/router';
import { Home } from './home/home';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'counter', loadChildren: () => import('./counter/counter.routes').then((m) => m.routes) },
  { path: 'courses', loadChildren: () => import('./courses/courses.routes').then((m) => m.routes) },
];
