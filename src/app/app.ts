import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingService } from './core/services/loading.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, MatProgressSpinnerModule],
  template: `
    <router-outlet></router-outlet>
    @if(loading()) {
    <div class="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <mat-spinner></mat-spinner>
    </div>
    }
  `,
})
export class App {
  protected readonly title = signal('proffeo-task');
  loading = inject(LoadingService).loading;
}
