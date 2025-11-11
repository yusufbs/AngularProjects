import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../model/user.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    const url = `${environment.FireBase.loginUrl}?key=${environment.FireBase.apiKey}`;
    const body = { email, password, returnSecureToken: true };
    return this.http.post<User>(url, body);
  }

  signup(email: string, password: string) {
    const url = `${environment.FireBase.signupUrl}?key=${environment.FireBase.apiKey}`;
    const body = { email, password, returnSecureToken: true };
    return this.http.post<User>(url, body);
  }

  getErrorMessage(errorResponse: HttpErrorResponse) {
    let message = 'An unknown error occurred!';

    if (!errorResponse.error || !errorResponse.error.error) {
      return message;
    }

    switch (errorResponse.error.error.message) {
      case 'EMAIL_NOT_FOUND':
        message = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        message = 'This password is not correct.';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        message = 'The login credentials are invalid.';
        break;
      case 'USER_DISABLED':
        message = 'This user has been disabled.';
        break;
      case 'EMAIL_EXISTS':
        message = 'The email address is already in use by another account.';
        break;
      case 'OPERATION_NOT_ALLOWED':
        message = 'Password sign-in is disabled for this project.';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        message =
          'We have blocked all requests from this device due to unusual activity. Try again later.';
        break;

      default:
        message = errorResponse.error.error.message;
        break;
    }

    return message;
  }
}
