import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

/**
 * Application Routes
 *
 * Modern standalone routing architecture:
 * - Products: Uses standalone routes file (products.routes.ts)
 * - Admin: Migrated to standalone in Task 4 (admin.routes.ts)
 */
export const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'products',
    // Modern approach: Load routes file instead of module
    loadChildren: () => import('../../libs/features/products/products.routes')
      .then(m => m.PRODUCTS_ROUTES)
  },
  {
    path: 'admin',
    // Modern approach: Load routes file with standalone components
    loadChildren: () => import('../../libs/features/admin/admin.routes')
      .then(m => m.ADMIN_ROUTES)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
