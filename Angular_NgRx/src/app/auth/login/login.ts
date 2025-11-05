import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  loginForm: FormGroup;

  constructor() {
    this.loginForm = new FormGroup({
      // Define your form controls here
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit() {}

  onLogin() {
    console.log(this.loginForm.value);
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
