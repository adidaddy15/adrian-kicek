# Project Architecture

## Directory Structure

```
src/
├── app/
│   ├── core/                    # Core functionality, guards, interceptors
│   │   ├── guards/
│   │   ├── interceptors/
│   │   └── services/           # Singleton services (cache)
│   │
│   ├── features/               # Feature modules
│   │   ├── posts/             # Posts feature
│   │   │   ├── components/    # Post-specific components
│   │   │   ├── services/      # Post-related services
│   │   │   └── models/        # Post-related interfaces/types
│   │   │
│   │   └── gantt/            # Gantt chart feature (bonus)
│   │       ├── components/
│   │       └── models/
│   │
│   ├── shared/               # Shared components, pipes, directives
│   │   ├── components/
│   │   ├── directives/
│   │   ├── pipes/
│   │   └── models/
│   │
│   └── layout/              # App layout components
```

## Components List

### Core Components

- `AppComponent` - Main application shell

### Layout Components

- `HeaderComponent` - Main navigation and app header
- `LoaderComponent` - Global loading spinner/skeleton

### Feature Components (Posts)

- `PostListComponent` - Displays list of posts with filtering
- `PostCardComponent` - Individual post card in the list
- `PostDetailsComponent` - Detailed view of a single post
- `PostFilterComponent` - Filtering interface for posts
- `PostCommentsComponent` - Comments section for post details
- `UserInfoComponent` - User information display for post details
- `FavoriteToggleComponent` - Toggle button for favorite posts

### Feature Components (Gantt - Bonus)

- `GanttViewComponent` - Main Gantt chart view
- `GanttTimelineComponent` - Timeline visualization component

### Shared Components

- `SpinnerComponent` - Loading spinner
- `SkeletonLoaderComponent` - Skeleton loading placeholders

## Services

### Core Services

- `PostCacheService` - Singleton service for caching posts data
- `FavoritesService` - Manages favorite posts state

### Feature Services

- `PostApiService` - Handles API calls for posts
- `UserApiService` - Handles API calls for user data
- `CommentApiService` - Handles API calls for comments
- `GanttDataService` - Manages Gantt chart data (bonus feature)

## State Management

### Approach

The application will use a combination of signals and singleton services for state management:

1. **Post Cache (PostCacheService)**

```typescript
@Injectable({ providedIn: 'root' })
export class PostCacheService {
  private posts = signal<Post[]>([]);
  private filters = signal<PostFilters>({
    searchText: '',
    userId: null,
    favoritesOnly: false,
  });

  // Computed signals for filtered data
  public filteredPosts = computed(() => {
    // Filter logic based on filters signal
  });
}
```

2. **Favorites Management (FavoritesService)**

```typescript
@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private favoriteIds = signal<number[]>([]);

  public isFavorite = computed((postId: number) => this.favoriteIds().includes(postId));
}
```

### Key State Management Principles:

1. **Data Caching**

   - Posts are cached in the `PostCacheService`
   - Cached data is cleared only on explicit refresh or filter changes

2. **Reactive Updates**

   - Using signals for reactive state management
   - Computed values for derived state
   - No Zone.js dependency (zoneless change detection)

3. **State Persistence**

   - All state is memory-based (singleton services)
   - State is reset on page refresh

4. **Performance Optimization**
   - Lazy loading of features
   - Caching of API responses
   - Computed signals for efficient filtering

This architecture ensures a clean, maintainable, and performant application structure while adhering to Angular 20's best practices and the requirements specified in the task.
