import { effect, Injectable, signal } from '@angular/core';
import { Course } from '../../model/course.model';

@Injectable()
export class CourseService {
  private courses: Course[] = [
    {
      id: '1',
      title: 'Angular Basics',
      description: 'Learn the basics of Angular.',
      image: 'angular-basics.jpg',
      author: 'John Doe',
      price: 29.99,
    },
    {
      id: '2',
      title: 'Advanced TypeScript',
      description: 'Deep dive into TypeScript features.',
      image: 'advanced-typescript.jpg',
      author: 'Jane Smith',
      price: 39.99,
    },
    {
      id: '3',
      title: 'RxJS in Depth',
      description: 'Master reactive programming with RxJS.',
      image: 'rxjs-in-depth.jpg',
      author: 'Mike Johnson',
      price: 34.99,
    },
  ];
  public showCourseForm = signal<boolean>(false);
  public courseData = signal<Course[]>(this.courses);
  public editMode = signal<boolean>(false);
  public selectedCourse = signal<Course | null>(null);

  eff = effect(() => {
    console.log('Courses data changed:', this.courseData());
  });

  changeShowForm(value: boolean) {
    this.showCourseForm.set(value);
  }

  changeEditMode(value: boolean) {
    this.editMode.set(value);
  }

  setSelectedCourse(course: Course | null) {
    this.selectedCourse.set(course);
  }

  updateCourse(course: Course) {
    this.courseData.update((courses) => courses.map((c) => (c.id === course.id ? course : c)));
  }

  addCourse(course: Course) {
    this.courseData.update((courses) => [...courses, course]);
  }

  deleteCourse(id: string) {
    this.courseData.update((courses) => courses.filter((c) => c.id !== id));
  }
}
