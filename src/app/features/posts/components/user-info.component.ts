import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../shared/models/user.interface';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold mb-4">Author Information</h2>
      @if (user) {
      <div class="space-y-2">
        <p>
          <span class="font-medium">Name:</span>
          {{ user.name }}
        </p>
        <p>
          <span class="font-medium">Email:</span>
          <a href="mailto:{{ user.email }}" class="text-blue-600 hover:underline">
            {{ user.email }}
          </a>
        </p>
        <p>
          <span class="font-medium">Company:</span>
          {{ user.company.name }}
        </p>
        <p>
          <span class="font-medium">Website:</span>
          <a
            href="https://{{ user.website }}"
            target="_blank"
            rel="noopener"
            class="text-blue-600 hover:underline"
          >
            {{ user.website }}
          </a>
        </p>
      </div>
      }
    </div>
  `,
})
export class UserInfoComponent {
  @Input() user: User | null = null;
}
