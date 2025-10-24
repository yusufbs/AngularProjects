import { createAction, createReducer, on } from '@ngrx/store';
import { Course } from '../../model/course.model';

//courses.state.ts
export interface CoursesState {
  courses: Course[];
}

export const initialCoursesState: CoursesState = {
  courses: [],
};

//courses.actions.ts
export const getCourses = createAction('[Courses] Get Courses');

//courses.reducer.ts
export const coursesReducer = createReducer(initialCoursesState);

//courses.selectors.ts
