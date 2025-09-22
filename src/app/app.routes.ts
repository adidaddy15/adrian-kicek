import { Routes } from '@angular/router';
import { App } from './app';
import { PostListComponent } from './features/posts/components/post-list.component';

export const routes: Routes = [
  {
    path: '',
    component: PostListComponent,
  },
  { path: '**', redirectTo: '' },
];
