import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../../shared/models/post.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostApiService {
  private readonly apiUrl = environment.API_URL;
  private http = inject(HttpClient);

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/posts`);
  }

  getPostsByUserId(userId: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/posts`, {
      params: { userId: userId.toString() },
    });
  }
}
