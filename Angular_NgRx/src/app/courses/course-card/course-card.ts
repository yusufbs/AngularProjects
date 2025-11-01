import { Component, Input } from '@angular/core';
import { Course } from '../../model/course.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import {
  deleteCourseAction,
  setEditModeAction,
  setSelectedCourseAction,
  showFormAction,
} from '../state/courses.state';

@Component({
  selector: 'app-course-card',
  imports: [],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css',
})
export class CourseCard {
  @Input() course: Course | null = null;

  constructor(private store: Store<AppState>) {}

  onCourseEdit() {
    this.store.dispatch(showFormAction({ value: true }));
    this.store.dispatch(setEditModeAction({ editMode: true }));
    this.store.dispatch(setSelectedCourseAction({ course: this.course! }));
  }

  onDeleteClicked() {
    const confirm = window.confirm('Are you sure you want to delete this course?');
    if (confirm) this.store.dispatch(deleteCourseAction({ courseId: this.course!.id }));
  }
}
