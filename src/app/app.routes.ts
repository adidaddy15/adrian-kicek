import { Routes } from '@angular/router';
import { App } from './app';
import { PostListComponent } from './features/posts/components/post-list.component';

export const routes: Routes = [
  {
    path: '',
    component: PostListComponent,
  },
  {
    path: 'posts/:id',
    loadComponent: () =>
      import('./features/posts/components/post-details.component').then(
        (m) => m.PostDetailsComponent
      ),
  },
  { path: '**', redirectTo: '' },
];
