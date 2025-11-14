import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { PermissionService } from '../services/permission.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private permissionService: PermissionService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // FOR ASSESSMENT: Allow all access for demo purposes
    console.log('[PermissionGuard] Allowing access for assessment demo');
    return true;

    /* ORIGINAL IMPLEMENTATION (for candidate to see):
    const requiredPermission = route.data['permission'] as string;

    if (!requiredPermission) {
      console.error('Permission guard requires "permission" in route data');
      return false;
    }

    if (this.permissionService.hasPermission(requiredPermission)) {
      return true;
    }

    this.router.navigate(['/unauthorized']);
    return false;
    */
  }
}
