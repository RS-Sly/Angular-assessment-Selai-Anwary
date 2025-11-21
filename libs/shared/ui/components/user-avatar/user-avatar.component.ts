import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Task 1: Simple Component Migration
 *
 * COMPLETED: Converted to standalone component
 * ✓ Added standalone: true
 * ✓ Added CommonModule for *ngIf directives
 * ✓ Can be imported directly without SharedUiModule
 */
@Component({
  selector: 'app-user-avatar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="avatar" [class.avatar-large]="size === 'large'" [class.avatar-small]="size === 'small'">
      <img [src]="imageUrl" [alt]="name" *ngIf="imageUrl" (error)="onImageError()">
      <span class="avatar-initials" *ngIf="!imageUrl">
        {{ getInitials(name) }}
      </span>
      <span class="status-indicator"
            [class.online]="isOnline"
            [class.offline]="!isOnline"
            *ngIf="showStatus">
      </span>
    </div>
  `,
  styleUrls: ['./user-avatar.component.scss']
})
export class UserAvatarComponent {
  @Input() name: string = '';
  @Input() imageUrl?: string;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() isOnline: boolean = false;
  @Input() showStatus: boolean = true;

  getInitials(name: string): string {
    if (!name) return '?';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  onImageError(): void {
    // Image failed to load, will show initials instead
    this.imageUrl = undefined;
  }
}