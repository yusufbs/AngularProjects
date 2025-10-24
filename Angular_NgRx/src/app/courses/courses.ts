import { Component } from '@angular/core';
import { CourseCard } from './course-card/course-card';

@Component({
  selector: 'app-courses',
  imports: [CourseCard],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class Courses {}
