import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminSidebarComponent } from './admin-sidebar.component';

/**
 * Test file for AdminSidebarComponent
 *
 * Updated for standalone component - component is now imported instead of declared
 */
describe('AdminSidebarComponent', () => {
  let component: AdminSidebarComponent;
  let fixture: ComponentFixture<AdminSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AdminSidebarComponent,  // Standalone component goes in imports
        BrowserAnimationsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display menu items', () => {
    component.menuItems = [
      { label: 'Dashboard', icon: 'dashboard', route: '/admin/dashboard' },
      { label: 'Users', icon: 'people', route: '/admin/users' },
      { label: 'Settings', icon: 'settings', route: '/admin/settings' }
    ];
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const listItems = compiled.querySelectorAll('a[mat-list-item]');
    expect(listItems.length).toBe(3);
  });

  it('should display correct labels for menu items', () => {
    component.menuItems = [
      { label: 'Dashboard', icon: 'dashboard', route: '/admin/dashboard' },
      { label: 'Users', icon: 'people', route: '/admin/users' }
    ];
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const labels = compiled.querySelectorAll('span[matlistitemtitle]');
    expect(labels[0].textContent.trim()).toBe('Dashboard');
    expect(labels[1].textContent.trim()).toBe('Users');
  });

  it('should display correct icons for menu items', () => {
    component.menuItems = [
      { label: 'Dashboard', icon: 'dashboard', route: '/admin/dashboard' },
      { label: 'Settings', icon: 'settings', route: '/admin/settings' }
    ];
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const icons = compiled.querySelectorAll('mat-icon');
    expect(icons[0].textContent.trim()).toBe('dashboard');
    expect(icons[1].textContent.trim()).toBe('settings');
  });

  it('should highlight active route', () => {
    component.menuItems = [
      { label: 'Dashboard', icon: 'dashboard', route: '/admin/dashboard' },
      { label: 'Users', icon: 'people', route: '/admin/users' }
    ];
    component.activeRoute = '/admin/users';
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const listItems = compiled.querySelectorAll('a[mat-list-item]');
    expect(listItems[0].classList.contains('active')).toBeFalse();
    expect(listItems[1].classList.contains('active')).toBeTrue();
  });

  it('should emit navigate event when menu item is clicked', () => {
    spyOn(component.navigate, 'emit');

    component.menuItems = [
      { label: 'Dashboard', icon: 'dashboard', route: '/admin/dashboard' },
      { label: 'Users', icon: 'people', route: '/admin/users' }
    ];
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const firstItem = compiled.querySelector('a[mat-list-item]');
    firstItem.click();

    expect(component.navigate.emit).toHaveBeenCalledWith('/admin/dashboard');
  });

  it('should handle empty menu items', () => {
    component.menuItems = [];
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const listItems = compiled.querySelectorAll('a[mat-list-item]');
    expect(listItems.length).toBe(0);
  });

  it('should handle multiple clicks on different menu items', () => {
    spyOn(component.navigate, 'emit');

    component.menuItems = [
      { label: 'Dashboard', icon: 'dashboard', route: '/admin/dashboard' },
      { label: 'Users', icon: 'people', route: '/admin/users' },
      { label: 'Settings', icon: 'settings', route: '/admin/settings' }
    ];
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const listItems = compiled.querySelectorAll('a[mat-list-item]');

    listItems[0].click();
    expect(component.navigate.emit).toHaveBeenCalledWith('/admin/dashboard');

    listItems[2].click();
    expect(component.navigate.emit).toHaveBeenCalledWith('/admin/settings');

    expect(component.navigate.emit).toHaveBeenCalledTimes(2);
  });

  it('should update active route when activeRoute input changes', () => {
    component.menuItems = [
      { label: 'Dashboard', icon: 'dashboard', route: '/admin/dashboard' },
      { label: 'Users', icon: 'people', route: '/admin/users' }
    ];
    component.activeRoute = '/admin/dashboard';
    fixture.detectChanges();

    let compiled = fixture.nativeElement;
    let listItems = compiled.querySelectorAll('a[mat-list-item]');
    expect(listItems[0].classList.contains('active')).toBeTrue();

    // Change active route
    component.activeRoute = '/admin/users';
    fixture.detectChanges();

    compiled = fixture.nativeElement;
    listItems = compiled.querySelectorAll('a[mat-list-item]');
    expect(listItems[0].classList.contains('active')).toBeFalse();
    expect(listItems[1].classList.contains('active')).toBeTrue();
  });

  it('should handle menu items without permissions', () => {
    component.menuItems = [
      { label: 'Dashboard', icon: 'dashboard', route: '/admin/dashboard', permission: null },
      { label: 'Settings', icon: 'settings', route: '/admin/settings', permission: 'admin.settings' }
    ];
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const listItems = compiled.querySelectorAll('a[mat-list-item]');
    // Component doesn't filter by permission, just displays all items
    expect(listItems.length).toBe(2);
  });
});