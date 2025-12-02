import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Course } from '../../model/course.model';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-add-course',
  imports: [ReactiveFormsModule],
  templateUrl: './add-course.html',
  styleUrl: './add-course.css',
})
export class AddCourse implements OnInit {
  private svc = inject(CourseService);
  courseForm!: FormGroup;
  editMode = signal<boolean>(false);
  currentCourse = signal<Course | null>(null);
  selectedImageFile: File | null = null;

  eff = effect(() => {
    console.log('Selected course changed:', this.currentCourse());
    console.log('Edit mode is:', this.editMode());
  });

  ngOnInit(): void {
    this.editMode = this.svc.editMode;
    this.currentCourse = this.svc.selectedCourse;

    this.init();
    this.subscribeToSelectedCourse();
  }

  init() {
    this.courseForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(5000),
      ]),
      author: new FormControl(null, [Validators.required]),
      price: new FormControl(null),
      image: new FormControl(null),
    });
  }

  subscribeToSelectedCourse() {
    if (this.editMode() && this.currentCourse()) {
      this.courseForm.patchValue(this.currentCourse()!);
    } else {
      this.courseForm.reset();
    }
  }

  hideCreateForm() {
    this.svc.changeShowForm(false);
  }

  async onCreateOrUpdateCourse() {
    if (!this.courseForm.valid) {
      return;
    }
    if (this.editMode()) {
      const updatedCourse: Course = {
        ...this.courseForm.value,
        id: this.currentCourse()?.id!,
      };
      this.svc.updateCourse(updatedCourse);
    } else {
      this.svc.addCourse(this.courseForm.value);
    }

    this.hideCreateForm();
    this.svc.changeEditMode(false);
  }

  showTitleValidationErrors() {
    const titleControl = this.courseForm.get('title');
    if (titleControl?.touched && !titleControl.valid) {
      if (titleControl.errors?.['required']) {
        return 'Title is required.';
      }
      if (titleControl.errors?.['minlength']) {
        return 'Title must be at least 10 characters long.';
      }
      if (titleControl.errors?.['maxlength']) {
        return 'Title cannot exceed 5000 characters.';
      }
    }
    return null;
  }

  showDescriptionValidationErrors() {
    const descriptionControl = this.courseForm.get('description');
    if (descriptionControl?.touched && !descriptionControl.valid) {
      if (descriptionControl.errors?.['required']) {
        return 'Description is required.';
      }
      if (descriptionControl.errors?.['minlength']) {
        return 'Description must be at least 6 characters long.';
      }
      if (descriptionControl.errors?.['maxlength']) {
        return 'Description cannot exceed 100 characters.';
      }
    }
    return null;
  }

  showAuthorValidationErrors() {
    const authorControl = this.courseForm.get('author');
    if (authorControl?.touched && !authorControl.valid) {
      if (authorControl.errors?.['required']) {
        return 'Author is required.';
      }
    }
    return null;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImageFile = file;
      const fileNameSpan = document.querySelector('.file-name');
      if (fileNameSpan) {
        fileNameSpan.textContent = file.name;
      }
    }
  }
}
