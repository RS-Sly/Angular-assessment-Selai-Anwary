import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

/**
 * Application Routes
 *
 * Modern standalone routing architecture:
 * - Products: Uses standalone routes file (products.routes.ts)
 * - Admin: Will be migrated to standalone in Task 4
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
    // Legacy approach: Still using NgModule (will be migrated in Task 4)
    loadChildren: () => import('../../libs/features/admin/admin.module')
      .then(m => m.AdminModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
