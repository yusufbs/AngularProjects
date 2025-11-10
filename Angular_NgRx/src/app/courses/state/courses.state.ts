import { Course } from '../../model/course.model';

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
