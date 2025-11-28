import { Course } from '../../model/course.model';

export interface CoursesState {
  courses: Course[];
  showForm: boolean;
  isEditMode: boolean;
  selectedCourse?: Course;
}

export const initialCoursesState: CoursesState = {
  courses: [],
  showForm: false,
  isEditMode: false,
  selectedCourse: undefined,
};
