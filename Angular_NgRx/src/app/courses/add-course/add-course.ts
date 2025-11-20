import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Course } from '../../model/course.model';
import { Subscription } from 'rxjs';
import {
  showFormAction,
  updateCourseAction,
  createCourseAction,
  setEditModeAction,
  setSelectedCourseAction,
} from '../state/courses.actions';
import { getEditModeSelector, getSelectedCourseSelector } from '../state/courses.selectors';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-add-course',
  imports: [ReactiveFormsModule],
  templateUrl: './add-course.html',
  styleUrl: './add-course.css',
})
export class AddCourse implements OnInit, OnDestroy {
  courseForm!: FormGroup;
  editMode: boolean = false;
  course!: Course | undefined;
  selectedImageFile: File | null = null;

  editModeSubscription: Subscription | undefined;
  selectedCourseSubscription: Subscription | undefined;

  private store: Store<AppState> = inject(Store<AppState>);
  private courseService: CourseService = inject(CourseService);


  ngOnInit(): void {
    this.editModeSubscription = this.store.select(getEditModeSelector).subscribe((mode) => {
      this.editMode = mode;
    });
    this.init();
    this.subscribeToSelectedCourse();
  }

  ngOnDestroy(): void {
    this.editModeSubscription?.unsubscribe();
    this.selectedCourseSubscription?.unsubscribe();
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
    // Subscribe to selected course from the store if needed
    this.selectedCourseSubscription = this.store
      .select(getSelectedCourseSelector)
      .subscribe((data) => {
        this.course = data;
      });
    if (this.editMode && this.course) {
      this.courseForm.patchValue(this.course);
    } else {
      this.courseForm.reset();
    }
  }

  hideCreateForm() {
    this.store.dispatch(showFormAction({ value: false }));
  }

  async onCreateOrUpdateCourse() {
    if (!this.courseForm.valid) {
      return;
    }
    if (this.editMode) {
      const updatedCourse: Course = {
        ...this.courseForm.value,
        id: this.course?.id!,
      };
      this.store.dispatch(updateCourseAction({ course: updatedCourse }));
    } else {
      const url = await this.courseService.uploadImage(this.selectedImageFile!);
      this.courseForm.patchValue({ image: url });
      this.store.dispatch(createCourseAction({ course: this.courseForm.value }));
    }

    this.hideCreateForm();
    this.store.dispatch(setEditModeAction({ editMode: false }));
    this.store.dispatch(setSelectedCourseAction({ course: {} as Course }));
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
