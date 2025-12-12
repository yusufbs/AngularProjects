import { inject, Injectable } from '@angular/core';
import { ApiService } from '../app/core/services/api.service';
// import { Observable } from 'rxjs/internal/Observable';
import { User } from '../app/core/models/object-model';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  private userApiUrl = 'http://localhost:3000/api/users/';
  private apiSvc = inject(ApiService);

  getUserData(user_id: Number): Observable<User> {
    return this.apiSvc.get(this.userApiUrl + user_id);
  }

  updateUserData(user_id: Number, user_dto: User): Observable<User> {
    return this.apiSvc.put(this.userApiUrl + user_id, user_dto);
  }
}
