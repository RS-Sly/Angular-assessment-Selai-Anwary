import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AdminDashboardComponent } from './admin-dashboard.component';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { AdminService } from '../services/admin.service';

/**
 * Test file for AdminDashboardComponent
 *
 * Updated for standalone component - component and its child components are now imported
 */
describe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let fixture: ComponentFixture<AdminDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AdminDashboardComponent,  // Standalone component goes in imports
        AdminHeaderComponent,     // Child component
        AdminSidebarComponent,    // Child component
        HttpClientTestingModule,
        RouterTestingModule,
        MatCardModule,
        MatIconModule,
        MatProgressSpinnerModule
      ],
      providers: [AdminService]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have current user', () => {
    expect(component.currentUser).toBeDefined();
  });

  it('should have menu items', () => {
    expect(component.menuItems).toBeDefined();
    expect(Array.isArray(component.menuItems)).toBeTruthy();
  });

  it('should have page title', () => {
    expect(component.pageTitle).toBe('Admin Dashboard');
  });
});
