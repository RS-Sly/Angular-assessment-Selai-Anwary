import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-admin-sidebar',
  template: `
    <mat-nav-list>
      <a mat-list-item
         *ngFor="let item of menuItems"
         [class.active]="activeRoute.includes(item.route)"
         (click)="navigate.emit(item.route)">
        <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>
        <span matListItemTitle>{{ item.label }}</span>
      </a>
    </mat-nav-list>
  `,
  styles: [`
    mat-nav-list {
      padding-top: 0;
    }
    .active {
      background-color: rgba(63, 81, 181, 0.1);
    }
  `]
})
export class AdminSidebarComponent {
  @Input() menuItems: any[] = [];
  @Input() activeRoute = '';
  @Output() navigate = new EventEmitter<string>();
}
