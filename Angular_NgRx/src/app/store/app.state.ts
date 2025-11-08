import { authReducer, AuthState } from '../auth/state/auth.state';
import { counterReducer, CounterState } from '../counter/states/counter.state';
import { coursesReducer, CoursesState } from '../courses/state/courses.state';

export interface AppState {
  counter: CounterState;
  courses: CoursesState;
  auth: AuthState;
}

export const appReducer = {
  counter: counterReducer,
  courses: coursesReducer,
  auth: authReducer,
};
