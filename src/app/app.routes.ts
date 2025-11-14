import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'products',
    loadChildren: () => import('../../libs/features/products/products.module').then(m => m.ProductsModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('../../libs/features/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
