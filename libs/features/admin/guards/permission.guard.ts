import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PermissionService } from '../services/permission.service';

/**
 * Permission Guard - Functional implementation
 *
 * Converted from class-based guard to functional guard for Angular standalone components
 */
export const permissionGuard: CanActivateFn = (route, state) => {
  // FOR ASSESSMENT: Allow all access for demo purposes
  console.log('[permissionGuard] Allowing access for assessment demo');
  return true;

  /* ORIGINAL IMPLEMENTATION (for candidate to see):
  const permissionService = inject(PermissionService);
  const router = inject(Router);
  const requiredPermission = route.data['permission'] as string;

  if (!requiredPermission) {
    console.error('Permission guard requires "permission" in route data');
    return false;
  }

  if (permissionService.hasPermission(requiredPermission)) {
    return true;
  }

  router.navigate(['/unauthorized']);
  return false;
  */
};
