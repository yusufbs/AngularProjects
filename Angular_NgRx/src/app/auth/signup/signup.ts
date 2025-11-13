import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { signupStartAction } from '../state/auth.actions';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  signupForm: FormGroup;

  constructor(private store: Store<AppState>) {
    this.signupForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  onSignup() {
    const { email, password } = this.signupForm.value;
    this.store.dispatch(signupStartAction({ email, password }));
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
