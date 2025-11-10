import { createFeatureSelector, createSelector } from '@ngrx/store';
import { COURSES_STATE } from '../../constants';
import { CoursesState } from './courses.state';

const getCoursesState = createFeatureSelector<CoursesState>(COURSES_STATE);

export const getcoursesSelector = createSelector(getCoursesState, (state) => state.courses);
export const showFormSelector = createSelector(getCoursesState, (state) => state.showForm);
export const getEditModeSelector = createSelector(getCoursesState, (state) => state.isEditMode);
export const getSelectedCourseSelector = createSelector(
  getCoursesState,
  (state) => state.selectedCourse
);
