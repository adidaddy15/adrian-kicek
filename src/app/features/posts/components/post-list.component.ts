import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCacheService } from '../services/post-cache.service';
import { PostCardComponent } from './post-card.component';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, PostCardComponent],
  providers: [PostCacheService],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6">Posts</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (post of postCache.posts$(); track post.id) {
        <app-post-card [post]="post" />
        }
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
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
