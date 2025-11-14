import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
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
