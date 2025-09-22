import { computed, inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { Post } from '../../shared/models/post.interface';
import { PostApiService } from '../../features/posts/services/post-api.service';
import { PostFilters } from '../../shared/models/post-filters.interface';
import { FavouritesService } from './favourites-service';

@Injectable({
  providedIn: 'root',
})
export class PostCacheService {
  private posts = signal<Post[]>([]);
  private filters = signal<PostFilters>({
    searchText: '',
    userId: null,
    favouritesOnly: false,
  });

  public readonly posts$ = this.posts.asReadonly();
  public readonly filters$ = this.filters.asReadonly();

  private postApiService = inject(PostApiService);
  private favouritesService = inject(FavouritesService);

  public readonly filteredPosts = computed(() => {
    let result = this.posts();
    if (this.filters().searchText) {
      const searchText = this.filters().searchText.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(searchText) ||
          post.body.toLowerCase().includes(searchText)
      );
    }

    if (this.filters().favouritesOnly) {
      result = result.filter((post) => this.favouritesService.isFavourite(post.id));
    }

    return result;
  });

  fetchPosts$() {
    const userId = this.filters().userId;
    const request = userId
      ? this.postApiService.getPostsByUserId(userId)
      : this.postApiService.getPosts();

    return request.pipe(tap((posts) => this.posts.set(posts)));
  }

  updateFilters(filters: Partial<PostFilters>) {
    this.filters.update((current) => ({ ...current, ...filters }));

    if ('userId' in filters) {
      this.fetchPosts$().subscribe();
    }
  }

  clearCache() {
    this.posts.set([]);
    this.filters.set({
      searchText: '',
      userId: null,
      favouritesOnly: false,
    });
  }
}
