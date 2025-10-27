import {
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
  props,
} from '@ngrx/store';
import { Course } from '../../model/course.model';

//courses.state.ts
export interface CoursesState {
  courses: Course[];
  showForm: boolean;
  isEditMode: boolean;
  selectedCourse?: Course;
}

export const initialCoursesState: CoursesState = {
  courses: [
    {
      id: 1,
      title: 'Mastering Modern JavaScript',
      description:
        'A comprehensive course covering ES6+ features, asynchronous JavaScript, and front-end development essentials.',
      image: '/images/javascript.jpg',
      author: 'John Doe',
      price: 49.99,
    },

    {
      id: 2,
      title: 'Angular - From Zero to Hero',
      description:
        'Learn to build robust and scalable single-page applications with Angular, including components, services, routing, and state management.',
      image: '/images/angular.jpg',
      author: 'Jane Smith',
      price: 59.99,
    },
  ],
  showForm: false,
  isEditMode: false,
  selectedCourse: undefined,
};

//courses.actions.ts
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

//courses.reducer.ts
export const coursesReducer = createReducer(
  initialCoursesState,
  on(showFormAction, (state, action) => ({
    ...state,
    showForm: action.value,
  })),
  on(createCourseAction, (state, action) => {
    const course = { ...action.course, id: state.courses.length + 1 };

    return {
      ...state,
      courses: [...state.courses, course],
    };
  }),
  on(setEditModeAction, (state, action) => ({
    ...state,
    isEditMode: action.editMode,
  })),
  on(setSelectedCourseAction, (state, action) => ({
    ...state,
    selectedCourse: action.course,
  }))
);

//courses.selectors.ts
const getCoursesState = createFeatureSelector<CoursesState>('courses');

export const getcoursesSelector = createSelector(getCoursesState, (state) => state.courses);
export const showFormSelector = createSelector(getCoursesState, (state) => state.showForm);
export const getEditModeSelector = createSelector(getCoursesState, (state) => state.isEditMode);
export const getSelectedCourseSelector = createSelector(
  getCoursesState,
  (state) => state.selectedCourse
);
