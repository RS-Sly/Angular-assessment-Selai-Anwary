import { Component, Input } from '@angular/core';

/**
 * Task 1: Simple Component Migration
 *
 * TODO: Convert this component to standalone
 * - Add standalone: true
 * - Add imports array with required modules
 * - Update any files that import this component
 *
 * HINT: Check what directives are used in the template (*ngIf)
 */
@Component({
  selector: 'app-user-avatar',
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