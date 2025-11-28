import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  createCourseAction,
  createCourseSuccessAction,
  readCoursesAction,
  readCoursesSuccessAction,
  updateCourseAction,
  updateCourseSuccessAction,
} from './courses.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { CourseService } from '../services/course.service';
import { Course } from '../../model/course.model';
import { setErrorMessage, setIsLoading } from '../../shared/shared.state';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';

@Injectable({
  providedIn: 'root',
})
export class CoursesEffects {
  private actions$ = inject(Actions);
  private courseService = inject(CourseService);
  private store: Store<AppState> = inject(Store<AppState>);

  createCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createCourseAction),
      mergeMap((action) => {
        this.store.dispatch(setIsLoading({ value: true }));
        return this.courseService.createCourse(action.course).pipe(
          map((data) => {
            this.store.dispatch(setIsLoading({ value: false }));
            const course: Course = { ...action.course, id: data.name };
            return createCourseSuccessAction({ course });
          }),
          catchError((error) => {
            this.store.dispatch(setIsLoading({ value: false }));
            const message = 'Something went wrong while creating the course.';
            return of(setErrorMessage({ message }));
          })
        );
      })
    );
  });

  readCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(readCoursesAction),
      mergeMap((action) => {
        // this.store.dispatch(setIsLoading({ value: true }));
        return this.courseService.readCourses().pipe(
          map((data) => {
            // this.store.dispatch(setIsLoading({ value: false }));
            return readCoursesSuccessAction({ courses: data });
          }),
          catchError((error) => {
            // this.store.dispatch(setIsLoading({ value: false }));
            const message = 'Something went wrong while fetching the couses.';
            return of(setErrorMessage({ message }));
          })
        );
      })
    );
  });

  udateCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateCourseAction),
      mergeMap((action) => {
        // this.store.dispatch(setIsLoading({ value: true }));
        return this.courseService.updateCourse(action.course).pipe(
          map((data) => {
            // this.store.dispatch(setIsLoading({ value: false }));
            return updateCourseSuccessAction({ course: action.course });
          }),
          catchError((error) => {
            // this.store.dispatch(setIsLoading({ value: false }));
            const message = 'Something went wrong while updating the couses.';
            return of(setErrorMessage({ message }));
          })
        );
      })
    );
  });
}
