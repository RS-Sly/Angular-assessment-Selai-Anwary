import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminHeaderComponent } from './admin-header.component';

/**
 * Test file for AdminHeaderComponent
 *
 * Updated for standalone component - component is now imported instead of declared
 */
describe('AdminHeaderComponent', () => {
  let component: AdminHeaderComponent;
  let fixture: ComponentFixture<AdminHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AdminHeaderComponent,  // Standalone component goes in imports
        BrowserAnimationsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Admin Portal" title', () => {
    const compiled = fixture.nativeElement;
    const toolbar = compiled.querySelector('mat-toolbar');
    expect(toolbar.textContent).toContain('Admin Portal');
  });

  it('should display user name when user is provided', () => {
    component.user = { name: 'John Doe', role: 'admin' };
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const welcomeText = compiled.querySelector('span:nth-of-type(3)');
    expect(welcomeText.textContent).toContain('Welcome, John Doe');
  });

  it('should not display user name when user is not provided', () => {
    component.user = null;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const text = compiled.textContent;
    expect(text).not.toContain('Welcome,');
  });

  it('should have logout button', () => {
    const compiled = fixture.nativeElement;
    const logoutButton = compiled.querySelector('button[mat-icon-button]');
    expect(logoutButton).toBeTruthy();
  });

  it('should emit logout event when logout button is clicked', () => {
    spyOn(component.logout, 'emit');

    const compiled = fixture.nativeElement;
    const logoutButton = compiled.querySelector('button[mat-icon-button]');
    logoutButton.click();

    expect(component.logout.emit).toHaveBeenCalled();
  });

  it('should display logout icon', () => {
    const compiled = fixture.nativeElement;
    const icon = compiled.querySelector('mat-icon');
    expect(icon.textContent).toContain('logout');
  });

  it('should handle user object with different properties', () => {
    component.user = {
      name: 'Jane Smith',
      role: 'superadmin',
      email: 'jane@example.com'
    };
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const welcomeText = compiled.querySelector('span:nth-of-type(3)');
    expect(welcomeText.textContent).toContain('Welcome, Jane Smith');
  });
});