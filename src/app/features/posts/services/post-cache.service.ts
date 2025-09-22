import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { Post } from '../../../shared/models/post.interface';
import { PostApiService } from './post-api.service';

@Injectable({
  providedIn: 'root',
})
export class PostCacheService {
  private posts = signal<Post[]>([]);
  public readonly posts$ = this.posts.asReadonly();
  private postApiService = inject(PostApiService);

  fetchPosts$() {
    return this.postApiService.getPosts().pipe(tap((posts) => this.posts.set(posts)));
  }

  clearCache() {
    this.posts.set([]);
  }
}
