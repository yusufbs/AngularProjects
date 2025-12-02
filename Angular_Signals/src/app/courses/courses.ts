import { Component, inject, OnInit, signal } from '@angular/core';
import { Course } from '../model/course.model';
import { CourseCard } from './course-card/course-card';
import { AddCourse } from './add-course/add-course';
import { CourseService } from './services/course.service';

@Component({
  selector: 'app-courses',
  imports: [CourseCard, AddCourse],
  providers: [CourseService],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class Courses implements OnInit {
  private svc = inject(CourseService);
  courses = signal<Course[]>([]);
  showForm = signal<boolean>(false);

  ngOnInit(): void {
    this.courses = this.svc.courseData;
    this.showForm = this.svc.showCourseForm;
  }

  showCreateForm() {
    this.svc.changeShowForm(true);
    this.svc.changeEditMode(false);
    this.svc.setSelectedCourse(null);
  }
}
