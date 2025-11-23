/**
 * Products Feature Routes
 *
 * Modern standalone routing - replaces ProductsModule
 *
 * This file defines routes for the products feature without requiring an NgModule.
 * All components are standalone and lazy-loaded automatically.
 *
 * Usage in app.routes.ts:
 * {
 *   path: 'products',
 *   loadChildren: () => import('./products.routes').then(m => m.PRODUCTS_ROUTES)
 * }
 */

import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';

export const PRODUCTS_ROUTES: Routes = [
  {
    path: '',
    component: ProductListComponent,
    title: 'Products'
  }
];
