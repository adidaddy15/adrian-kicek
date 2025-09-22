import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../shared/models/user.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private readonly apiUrl = environment.API_URL;
  private http = inject(HttpClient);

  getUser(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${userId}`);
  }
}
