import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';

/**
 * Admin Dashboard Component
 * Part of the Admin Module that needs to be converted to standalone
 */
@Component({
  selector: 'app-admin-dashboard',
  template: `
    <div class="admin-dashboard">
      <app-admin-header
        [user]="currentUser"
        (logout)="onLogout()">
      </app-admin-header>

      <div class="admin-layout">
        <app-admin-sidebar
          [menuItems]="menuItems"
          [activeRoute]="activeRoute"
          (navigate)="onNavigate($event)">
        </app-admin-sidebar>

        <main class="admin-content">
          <div class="content-header">
            <h1>{{ pageTitle }}</h1>
            <div class="breadcrumb">
              <a routerLink="/admin">Admin</a>
              <span *ngIf="breadcrumbs.length > 0"> / </span>
              <span *ngFor="let crumb of breadcrumbs; let last = last">
                <a [routerLink]="crumb.link" *ngIf="!last">{{ crumb.label }}</a>
                <span *ngIf="last">{{ crumb.label }}</span>
                <span *ngIf="!last"> / </span>
              </span>
            </div>
          </div>

          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  currentUser: any;
  menuItems: any[] = [];
  activeRoute = '';
  pageTitle = 'Admin Dashboard';
  breadcrumbs: any[] = [];

  constructor(
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.setupMenu();
    this.trackRouteChanges();
  }

  private loadUserData(): void {
    this.adminService.loadDashboardData().subscribe();
    this.currentUser = { name: 'Admin User', role: 'admin' };
  }

  private setupMenu(): void {
    this.menuItems = [
      {
        label: 'Overview',
        icon: 'dashboard',
        route: '/admin/overview',
        permission: null
      },
      {
        label: 'Settings',
        icon: 'settings',
        route: '/admin/settings',
        permission: 'settings.manage'
      }
    ];
  }

  private trackRouteChanges(): void {
    this.router.events.subscribe(() => {
      this.activeRoute = this.router.url;
      this.updateBreadcrumbs();
    });
  }

  private updateBreadcrumbs(): void {
    const segments = this.router.url.split('/').filter(s => s);
    this.breadcrumbs = segments.slice(1).map((segment, index) => ({
      label: this.formatLabel(segment),
      link: '/' + segments.slice(0, index + 2).join('/')
    }));
  }

  private formatLabel(segment: string): string {
    return segment.charAt(0).toUpperCase() +
           segment.slice(1).replace(/-/g, ' ');
  }

  onNavigate(route: string): void {
    this.router.navigate([route]);
  }

  onLogout(): void {
    this.router.navigate(['/']);
  }
}