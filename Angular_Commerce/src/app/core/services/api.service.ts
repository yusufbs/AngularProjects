import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/object-model';

@Injectable()
export class ApiService {
  get(url: string): Observable<any> {
    return new Observable();
  }

  put(url: string, user_dto: User): Observable<User> {
    return new Observable();
  }
}
