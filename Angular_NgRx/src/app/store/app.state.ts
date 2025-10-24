import { counterReducer, CounterState } from '../counter/states/counter.state';
import { coursesReducer, CoursesState } from '../courses/state/courses.state';

export interface AppState {
  counter: CounterState;
  courses: CoursesState;
}

export const appReducer = {
  counter: counterReducer,
  courses: coursesReducer,
};
