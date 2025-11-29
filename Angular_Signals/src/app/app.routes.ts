import { Routes } from '@angular/router';
import { Home } from './home/home';

export const routes: Routes = [
  { path: '', component: Home },
  {
    path: 'counter',
    loadChildren: () => import('./counter/counter.routes').then((m) => m.routes),
    // providers: [provideState(COUNTER_STATE, counterReducer)],
  },
];
