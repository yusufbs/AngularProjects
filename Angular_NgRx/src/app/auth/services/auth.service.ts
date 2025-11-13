import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../model/user.model';
import { environment } from '../../../environments/environment.development';
import { AuthResponse } from '../../model/auth-response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponse> {
    const url = `${environment.FireBase.loginUrl}?key=${environment.FireBase.apiKey}`;
    const body = { email, password, returnSecureToken: true };
    return this.http.post<AuthResponse>(url, body);
  }

  signup(email: string, password: string): Observable<AuthResponse> {
    const url = `${environment.FireBase.signupUrl}?key=${environment.FireBase.apiKey}`;
    const body = { email, password, returnSecureToken: true };
    return this.http.post<AuthResponse>(url, body);
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

  formatUserData(authResponse: AuthResponse): User {
    const expiresAt = new Date().getTime() + +authResponse.expiresIn * 1000;

    const formattedUser: User = {
      accessToken: authResponse.idToken,
      email: authResponse.email,
      expiresAt: expiresAt,
      userId: authResponse.localId,
    };

    return formattedUser;
  }

  saveUserToLocalStorage(user: User) {
    try {
      localStorage.setItem('userData', JSON.stringify(user));
    } catch (e) {
      console.error('Error saving user data to localStorage', e);
    }
  }
}
