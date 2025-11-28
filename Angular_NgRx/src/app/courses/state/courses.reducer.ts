import { createReducer, on } from '@ngrx/store';
import { initialCoursesState } from './courses.state';
import {
  showFormAction,
  setEditModeAction,
  setSelectedCourseAction,
  deleteCourseAction,
  createCourseSuccessAction,
  readCoursesSuccessAction,
  updateCourseSuccessAction,
} from './courses.actions';

export const coursesReducer = createReducer(
  initialCoursesState,
  on(showFormAction, (state, action) => ({
    ...state,
    showForm: action.value,
  })),
  on(createCourseSuccessAction, (state, action) => {
    return {
      ...state,
      courses: [...state.courses, action.course],
    };
  }),
  on(readCoursesSuccessAction, (state, action) => {
    return { ...state, courses: action.courses };
  }),
  on(setEditModeAction, (state, action) => ({
    ...state,
    isEditMode: action.editMode,
  })),
  on(setSelectedCourseAction, (state, action) => ({
    ...state,
    selectedCourse: action.course,
  })),
  on(updateCourseSuccessAction, (state, action) => {
    const updatedCourses = state.courses.map((course) =>
      course.id === action.course.id ? action.course : course
    );
    return { ...state, courses: updatedCourses };
  }),
  on(deleteCourseAction, (state, action) => {
    const filteredCourses = state.courses.filter((course) => course.id !== action.courseId);
    return { ...state, courses: filteredCourses };
  })
);
