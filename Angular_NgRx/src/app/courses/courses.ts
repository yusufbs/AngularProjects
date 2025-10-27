import { Component, OnInit } from '@angular/core';
import { CourseCard } from './course-card/course-card';
import { Course } from '../model/course.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import {
  getcoursesSelector,
  setEditModeAction,
  showFormAction,
  showFormSelector,
} from './state/courses.state';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { AddCourse } from './add-course/add-course';

@Component({
  selector: 'app-courses',
  imports: [CourseCard, AsyncPipe, AddCourse],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class Courses implements OnInit {
  courses$: Observable<Course[]> | null = null;
  showForm$: Observable<boolean> | null = null;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.courses$ = this.store.select(getcoursesSelector);
    this.showForm$ = this.store.select(showFormSelector);
  }

  showCreateForm() {
    this.store.dispatch(showFormAction({ value: true }));
    this.store.dispatch(setEditModeAction({ editMode: false }));
  }
}
