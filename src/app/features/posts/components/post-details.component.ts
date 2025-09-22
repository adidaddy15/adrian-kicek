import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Post } from '../../../shared/models/post.interface';
import { User } from '../../../shared/models/user.interface';
import { Comment } from '../../../shared/models/comment.interface';
import { PostApiService } from '../services/post-api.service';
import { UserApiService } from '../services/user-api.service';
import { CommentApiService } from '../services/comment-api.service';
import { UserInfoComponent } from './user-info.component';
import { PostCommentsComponent } from './post-comments.component';
import { combineLatest, forkJoin } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { FavouritesService } from '../../../core/services/favourites-service';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [CommonModule, RouterModule, UserInfoComponent, PostCommentsComponent],
  template: `
    <div class="container mx-auto px-4 py-8">
      <span
        [routerLink]="['/']"
        class="mb-6 flex items-center text-blue-600 hover:text-blue-800 cursor-pointer"
      >
        ← Back to posts
      </span>

      @if (post()) {
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 space-y-6">
          <article class="bg-white rounded-lg shadow-md p-6">
            <div class="flex justify-between items-start mb-4">
              <h1 class="text-2xl font-bold">{{ post()?.title }}</h1>
              <button
                (click)="toggleFavourite()"
                class="text-2xl cursor-pointer"
                [class.text-yellow-500]="isFavourite()"
                [class.text-gray-300]="!isFavourite()"
              >
                ★
              </button>
            </div>
            <p class="text-gray-700 whitespace-pre-line">{{ post()?.body }}</p>
          </article>

          <app-post-comments [comments]="comments()" />
        </div>

        <div class="lg:col-span-1">
          <app-user-info [user]="user()" />
        </div>
      </div>
      }
    </div>
  `,
})
export class PostDetailsComponent {
  private route = inject(ActivatedRoute);
  private postApiService = inject(PostApiService);
  private userApiService = inject(UserApiService);
  private commentApiService = inject(CommentApiService);
  private favouritesService = inject(FavouritesService);

  protected post = signal<Post | null>(null);
  protected user = signal<User | null>(null);
  protected comments = signal<Comment[]>([]);

  isFavourite = computed(() => {
    return this.post() ? this.favouritesService.isFavourite(this.post()!.id) : false;
  });

  constructor() {
    this.route.params
      .pipe(
        switchMap((params) => {
          const postId = +params['id'];
          return combineLatest([
            this.postApiService.getPosts(),
            this.commentApiService.getComments(postId),
          ]).pipe(
            tap(([posts, comments]) => {
              const post = posts.find((p) => p.id === postId);
              if (post) {
                this.post.set(post);
                this.comments.set(comments);
                this.userApiService.getUser(post.userId).subscribe((user) => this.user.set(user));
              }
            })
          );
        })
      )
      .subscribe();
  }

  toggleFavourite() {
    if (this.post()) {
      this.favouritesService.toggleFavourite(this.post()!.id);
    }
  }
}
