import { inject, Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private firebaseStorage: AngularFireStorage = inject(AngularFireStorage);

  async uploadImage(image: File) {
    const path = `courses/images/${Date.now()}_${image.name}`;
    const uploadTask = await this.firebaseStorage.upload(path, image);
    return await uploadTask.ref.getDownloadURL();
  }
}
