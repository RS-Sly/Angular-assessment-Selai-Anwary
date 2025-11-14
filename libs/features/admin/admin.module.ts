import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// Components
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';

// Guards
import { AdminGuard } from './guards/admin.guard';
import { PermissionGuard } from './guards/permission.guard';

/**
 * Task 4: Complex Feature with Routing
 *
 * TODO: Migrate this module to standalone:
 * 1. Convert all components to standalone
 * 2. Update routing to use loadComponent instead of loadChildren
 * 3. Convert AdminGuard to a functional guard (CanActivateFn)
 * 4. Update child routes to work with standalone components
 * 5. Remove the module and update parent routing
 *
 * CHALLENGES:
 * - Lazy loaded child routes
 * - Route guards that need conversion
 * - Service providers at module level
 * - Complex nested routing structure
 *
 * HINT: Functional guards use inject() function:
 * export const adminGuard: CanActivateFn = (route, state) => {
 *   const authService = inject(AuthService);
 *   return authService.isAdmin();
 * }
 */
@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminSidebarComponent,
    AdminHeaderComponent,
    AdminSettingsComponent
  ],
  imports: [
    // Angular Core
    CommonModule,
    ReactiveFormsModule,

    // Material
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSnackBarModule,

    // Routing configuration
    RouterModule.forChild([
      {
        path: '',
        component: AdminDashboardComponent,
        canActivate: [AdminGuard],
        children: [
          {
            path: '',
            redirectTo: 'overview',
            pathMatch: 'full'
          },
          {
            path: 'overview',
            component: AdminSettingsComponent
          },
          {
            path: 'settings',
            component: AdminSettingsComponent,
            canActivate: [PermissionGuard],
            data: { permission: 'settings.manage' }
          }
        ]
      }
    ])
  ],
  providers: [
    AdminGuard,
    PermissionGuard
  ]
})
export class AdminModule { }