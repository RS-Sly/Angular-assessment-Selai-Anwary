import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  template: `
    <mat-toolbar color="primary">
      <span>Admin Portal</span>
      <span class="spacer"></span>
      <span *ngIf="user">Welcome, {{ user.name }}</span>
      <button mat-icon-button (click)="logout.emit()">
        <mat-icon>logout</mat-icon>
      </button>
    </mat-toolbar>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }
  `]
})
export class AdminHeaderComponent {
  @Input() user: any;
  @Output() logout = new EventEmitter<void>();
}
