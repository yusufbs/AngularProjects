import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  signupForm: FormGroup;

  constructor() {
    this.signupForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  onSignup() {
    console.log(this.signupForm.value);
  }

  validateEmail() {
    const emailControl = this.signupForm.get('email');
    if (emailControl?.touched && emailControl?.invalid) {
      if (emailControl?.errors?.['required']) {
        return 'Email is required.';
      }
      if (emailControl?.errors?.['email']) {
        return 'Email is not valid.';
      }
    }
    return '';
  }

  validatePassword() {
    const passwordControl = this.signupForm.get('password');
    if (passwordControl?.touched && passwordControl?.invalid) {
      if (passwordControl?.errors?.['required']) {
        return 'Password is required.';
      }
    }
    return '';
  }
}
