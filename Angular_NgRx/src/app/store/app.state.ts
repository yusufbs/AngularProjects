import { authReducer, AuthState } from '../auth/state/auth.state';
import { counterReducer } from '../counter/states/counter.reducer';
import { CounterState } from '../counter/states/counter.state';
import { coursesReducer } from '../courses/state/courses.reducer';
import { CoursesState } from '../courses/state/courses.state';
import { sharedReducer, SharedState } from '../shared/shared.state';

export interface AppState {
  counter: CounterState;
  courses: CoursesState;
  auth: AuthState;
  shared: SharedState;
}

export const appReducer = {
  counter: counterReducer,
  courses: coursesReducer,
  auth: authReducer,
  shared: sharedReducer,
};
