import { Routes } from '@angular/router';
import { adminGuard } from './guards/admin.guard';
import { permissionGuard } from './guards/permission.guard';

/**
 * Admin Feature Routes
 *
 * Standalone routing configuration converted from AdminModule
 * - Uses loadComponent for lazy loading instead of loadChildren
 * - Uses functional guards (adminGuard, permissionGuard)
 * - All components are now standalone and lazy loaded
 */
export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./admin-dashboard/admin-dashboard.component')
      .then(m => m.AdminDashboardComponent),
    canActivate: [adminGuard],
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
      },
      {
        path: 'overview',
        loadComponent: () => import('./admin-settings/admin-settings.component')
          .then(m => m.AdminSettingsComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('./admin-settings/admin-settings.component')
          .then(m => m.AdminSettingsComponent),
        canActivate: [permissionGuard],
        data: { permission: 'settings.manage' }
      }
    ]
  }
];