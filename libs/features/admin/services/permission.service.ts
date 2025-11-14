import { Injectable } from '@angular/core';
import { AuthService } from '../../../data-access/services/auth.service';

@Injectable({ providedIn: 'root' })
export class PermissionService {
  constructor(private authService: AuthService) {}

  hasPermission(permission: string): boolean {
    return this.authService.hasPermission(permission);
  }

  hasAnyPermission(permissions: string[]): boolean {
    return permissions.some(p => this.hasPermission(p));
  }

  hasAllPermissions(permissions: string[]): boolean {
    return permissions.every(p => this.hasPermission(p));
  }
}
