import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCacheService } from '../../../core/services/post-cache.service';
import { PostCardComponent } from './post-card.component';
import { PostFiltersComponent } from './filters/post-filters.component';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, PostCardComponent, PostFiltersComponent],
  providers: [PostCacheService],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6">Posts</h1>

      <div class="mb-6">
        <app-post-filters />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (post of postCache.filteredPosts(); track post.id) {
        <app-post-card [post]="post" animate.enter="enter-animation" />
        } @if (!postCache.filteredPosts().length) {
        <p class="text-gray-500">No comments yet.</p>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .enter-animation {
        animation: slide-fade 1s;
      }
      @keyframes slide-fade {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `,
  ],
})
export class PostListComponent implements OnInit {
  postCache = inject(PostCacheService);

  ngOnInit(): void {
    this.postCache.fetchPosts$().subscribe();
  }
}
