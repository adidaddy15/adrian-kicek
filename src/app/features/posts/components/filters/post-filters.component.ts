import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostCacheService } from '../../../../core/services/post-cache.service';

@Component({
  selector: 'app-post-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post-filters.component.html',
})
export class PostFiltersComponent {
  protected postCache = inject(PostCacheService);

  protected userIds = [1, 2, 3];

  updateSearchText(searchText: string) {
    this.postCache.updateFilters({ searchText });
  }

  updateUserId(userId: number | null) {
    this.postCache.updateFilters({ userId });
  }

  updateFavouritesOnly(favouritesOnly: boolean) {
    this.postCache.updateFilters({ favouritesOnly });
  }
}
