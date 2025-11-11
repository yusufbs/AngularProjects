import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../model/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { loginStartAction } from '../state/auth.actions';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;
  loggedInUser: User | null = null;

  constructor(private store: Store<AppState>) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  onLogin() {
    const { email, password } = this.loginForm.value;
    this.store.dispatch(loginStartAction({ email, password }));
  }

  validateEmail() {
    const emailControl = this.loginForm.get('email');
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
    const passwordControl = this.loginForm.get('password');
    if (passwordControl?.touched && passwordControl?.invalid) {
      if (passwordControl?.errors?.['required']) {
        return 'Password is required.';
      }
    }
    return '';
  }
}
