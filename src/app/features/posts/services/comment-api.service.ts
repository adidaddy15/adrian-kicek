import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../../../shared/models/comment.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentApiService {
  private http = inject(HttpClient);
  private readonly apiUrl = environment.API_URL;

  getComments(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/posts/${postId}/comments`);
  }
}
