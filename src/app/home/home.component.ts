import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

/**
 * Home Component - Now Standalone!
 *
 * Demonstrates using the shared UI barrel export:
 * - Imports UserAvatarComponent directly from barrel
 * - Imports DateAgoPipe directly from barrel
 * - No SharedUiModule needed!
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  tasks = [
    {
      id: 1,
      title: 'Task 1: Simple Component Migration',
      description: 'Migrate UserAvatarComponent to standalone',
      file: 'libs/shared/ui/components/user-avatar/user-avatar.component.ts',
      difficulty: 'Easy',
      time: '20-30 minutes'
    },
    {
      id: 2,
      title: 'Task 2: Complex Component with Services',
      description: 'Migrate ProductListComponent with multiple services and Material dependencies',
      file: 'libs/features/products/product-list/product-list.component.ts',
      difficulty: 'Medium',
      time: '45-60 minutes'
    },
    {
      id: 3,
      title: 'Task 3: Shared Module Migration',
      description: 'Convert SharedUiModule with multiple components, directives, and pipes',
      file: 'libs/shared/ui/shared-ui.module.ts',
      difficulty: 'Hard',
      time: '45-60 minutes'
    },
    {
      id: 4,
      title: 'Task 4: Feature with Routing',
      description: 'Migrate AdminModule with routing, guards, and lazy loading',
      file: 'libs/features/admin/admin.module.ts',
      difficulty: 'Hard',
      time: '30-45 minutes'
    }
  ];
}
