import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {
  private favouriteIds = signal<number[]>([]);
  public readonly favouriteIds$ = this.favouriteIds.asReadonly();

  toggleFavourite(postId: number): void {
    const currentFavourites = this.favouriteIds();
    const index = currentFavourites.indexOf(postId);

    if (index === -1) {
      this.favouriteIds.update((ids) => [...ids, postId]);
    } else {
      this.favouriteIds.update((ids) => ids.filter((id) => id !== postId));
    }
  }

  isFavourite(postId: number): boolean {
    return this.favouriteIds().includes(postId);
  }
}
