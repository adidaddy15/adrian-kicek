import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../../shared/models/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostApiService {
  private readonly API_URL = 'https://jsonplaceholder.typicode.com';
  private http = inject(HttpClient);

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.API_URL}/posts`);
  }
}
