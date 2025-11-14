import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../../../data-access/services/auth.service';

/**
 * Admin Guard - Class-based implementation
 *
 * TODO: Convert to functional guard
 * Example of functional guard:
 *
 * import { inject } from '@angular/core';
 * import { CanActivateFn } from '@angular/router';
 *
 * export const adminGuard: CanActivateFn = (route, state) => {
 *   const authService = inject(AuthService);
 *   const router = inject(Router);
 *
 *   if (authService.isAdmin()) {
 *     return true;
 *   }
 *
 *   // Redirect to login or unauthorized
 *   return router.createUrlTree(['/unauthorized']);
 * };
 */
@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // FOR ASSESSMENT: Allow access without authentication
    // In production, this would check actual user authentication
    console.log('[AdminGuard] Allowing access for assessment demo');
    return true;

    /* ORIGINAL IMPLEMENTATION (for candidate to see):
    return this.authService.currentUser$.pipe(
      take(1),
      map(user => {
        if (user && user.role === 'admin') {
          return true;
        }

        // Store the attempted URL for redirecting
        this.authService.redirectUrl = state.url;

        // Redirect to unauthorized page
        this.router.navigate(['/unauthorized'], {
          queryParams: { returnUrl: state.url }
        });
        return false;
      })
    );
    */
  }
}