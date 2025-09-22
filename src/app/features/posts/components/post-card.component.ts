import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../../shared/models/post.interface';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h2 class="text-xl font-semibold mb-2">{{ post.title }}</h2>
      <p class="text-gray-600 line-clamp-3">{{ post.body }}</p>
    </div>
  `,
})
export class PostCardComponent {
  @Input({ required: true }) post!: Post;
}
