import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../../../data-access/services/auth.service';

/**
 * Admin Guard - Functional implementation
 *
 * Converted from class-based guard to functional guard for Angular standalone components
 */
export const adminGuard: CanActivateFn = (route, state) => {
  // FOR ASSESSMENT: Allow access without authentication
  // In production, this would check actual user authentication
  console.log('[adminGuard] Allowing access for assessment demo');
  return true;

  /* ORIGINAL IMPLEMENTATION (for candidate to see):
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.currentUser$.pipe(
    take(1),
    map(user => {
      if (user && user.role === 'admin') {
        return true;
      }

      // Store the attempted URL for redirecting
      authService.redirectUrl = state.url;

      // Redirect to unauthorized page
      router.navigate(['/unauthorized'], {
        queryParams: { returnUrl: state.url }
      });
      return false;
    })
  );
  */
};