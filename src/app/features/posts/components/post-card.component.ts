import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../../shared/models/post.interface';
import { FavouritesService } from '../../../core/services/favourites-service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div
      class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow relative cursor-pointer"
      [routerLink]="['/posts', post.id]"
    >
      <button
        (click)="onFavouriteClick($event)"
        class="absolute top-4 right-4 text-2xl"
        [class.text-yellow-500]="isFavourite"
        [class.text-gray-300]="!isFavourite"
      >
        ★
      </button>
      <h2 class="text-xl font-semibold mb-2 pr-8">{{ post.title }}</h2>
      <p class="text-gray-600 line-clamp-3">{{ post.body }}</p>
    </div>
  `,
})
export class PostCardComponent {
  @Input({ required: true }) post!: Post;
  private favouritesService = inject(FavouritesService);

  get isFavourite(): boolean {
    return this.favouritesService.isFavourite(this.post.id);
  }

  onFavouriteClick(event: MouseEvent) {
    event.stopPropagation();
    this.toggleFavourite();
  }

  toggleFavourite(): void {
    this.favouritesService.toggleFavourite(this.post.id);
  }
}
