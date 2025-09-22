import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Comment } from '../../../shared/models/comment.interface';

@Component({
  selector: 'app-post-comments',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold mb-4">Comments</h2>
      @if (comments?.length) {
      <div class="space-y-4">
        @for (comment of comments; track comment.id) {
        <div class="border-b border-gray-200 pb-4 last:border-b-0">
          <div class="flex items-center gap-2 mb-2">
            <span class="font-medium">{{ comment.name }}</span>
            <span class="text-sm text-gray-500">({{ comment.email }})</span>
          </div>
          <p class="text-gray-700">{{ comment.body }}</p>
        </div>
        }
      </div>
      } @else {
      <p class="text-gray-500">No comments yet.</p>
      }
    </div>
  `,
})
export class PostCommentsComponent {
  @Input() comments: Comment[] | null = null;
}
