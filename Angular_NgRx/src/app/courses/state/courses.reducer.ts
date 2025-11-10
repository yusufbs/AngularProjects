import { createReducer, on } from '@ngrx/store';
import { initialCoursesState } from './courses.state';
import {
  showFormAction,
  createCourseAction,
  setEditModeAction,
  setSelectedCourseAction,
  updateCourseAction,
  deleteCourseAction,
} from './courses.actions';

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
  })),
  on(updateCourseAction, (state, action) => {
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
