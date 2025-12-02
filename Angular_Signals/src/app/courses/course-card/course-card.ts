import { Component, inject, Input } from '@angular/core';
import { Course } from '../../model/course.model';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-course-card',
  imports: [],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css',
})
export class CourseCard {
  private svc = inject(CourseService);

  @Input() course: Course | null = null;

  onCourseEdit() {
    this.svc.changeShowForm(true);
    this.svc.changeEditMode(true);
    this.svc.setSelectedCourse(this.course);
  }

  onDeleteClicked() {
    const confirm = window.confirm('Are you sure you want to delete this course?');
    if (confirm) this.svc.deleteCourse(this.course!.id);
  }
}
