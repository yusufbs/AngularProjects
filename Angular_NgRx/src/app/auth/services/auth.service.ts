import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { FIREBASE_API_KEY } from '../../constants';
import { User } from '../../model/user.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    const url = `${environment.FireBase.url}?key=${environment.FireBase.apiKey}`;
    const body = { email, password, returnSecureToken: true };
    return this.http.post<User>(url, body);
  }
}
