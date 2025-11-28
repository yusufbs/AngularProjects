import { inject, Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Course } from '../../model/course.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private firebaseStorage: AngularFireStorage = inject(AngularFireStorage);
  private http: HttpClient = inject(HttpClient);

  async uploadImage(image: File) {
    if (image) {
      const path = `courses/images/${Date.now()}_${image.name}`;
      const uploadTask = await this.firebaseStorage.upload(path, image);
      return await uploadTask.ref.getDownloadURL();
    }
    return '';
  }

  createCourse(course: Course): Observable<{ name: string }> {
    const url = `${environment.firebaseConfig.databaseURL}/courses.json`;
    return this.http.post<{ name: string }>(url, course);
  }

  readCourses(): Observable<Course[]> {
    const url = `${environment.firebaseConfig.databaseURL}/courses.json`;
    return this.http.get<Course[]>(url).pipe(
      map((data) => {
        const courses: Course[] = [];

        for (let key in data) {
          const course: Course = { ...data[key], id: key };
          courses.push(course);
        }
        return courses;
      })
    );
  }

  updateCourse(course: Course) {
    const courseData = {
      [course.id]: {
        title: course.title,
        description: course.description,
        author: course.author,
        price: course.price,
        imageUrl: course.image,
      },
    };
    const url = `${environment.firebaseConfig.databaseURL}/courses.json`;
    return this.http.patch(url, courseData);
  }
}
