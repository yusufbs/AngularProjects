import { Routes } from '@angular/router';
import { Courses } from './courses';
// import { provideEffects } from '@ngrx/effects';
// import { CoursesEffects } from './state/courses.effects';

export const routes: Routes = [
  {
    path: '',
    component: Courses,
    // , providers: [provideEffects([CoursesEffects])
  },
];
