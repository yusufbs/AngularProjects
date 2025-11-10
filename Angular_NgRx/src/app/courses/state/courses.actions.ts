import { createAction, props } from '@ngrx/store';
import { Course } from '../../model/course.model';

export const getCoursesAction = createAction('[Courses] Get Courses');
export const showFormAction = createAction('[Courses] Show Form', props<{ value: boolean }>());
export const createCourseAction = createAction(
  '[Courses] Create Course',
  props<{ course: Course }>()
);
export const setEditModeAction = createAction(
  '[Courses] Set Edit Mode',
  props<{ editMode: boolean }>()
);
export const setSelectedCourseAction = createAction(
  '[Courses] Set Selected Course',
  props<{ course: Course }>()
);
export const updateCourseAction = createAction(
  '[Courses] Update Course',
  props<{ course: Course }>()
);
export const deleteCourseAction = createAction(
  '[Courses] Delete Course',
  props<{ courseId: number }>()
);
