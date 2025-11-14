import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserAvatarComponent } from './user-avatar.component';

/**
 * Test file for UserAvatarComponent
 *
 * After migration, this test should still pass with minimal changes.
 * The main change will be how the component is imported in TestBed.
 */
describe('UserAvatarComponent', () => {
  let component: UserAvatarComponent;
  let fixture: ComponentFixture<UserAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAvatarComponent ]
      // After migration, change to:
      // imports: [ UserAvatarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display initials when no image is provided', () => {
    component.name = 'John Doe';
    component.imageUrl = undefined;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const initials = compiled.querySelector('.avatar-initials');
    expect(initials).toBeTruthy();
    expect(initials.textContent.trim()).toBe('JD');
  });

  it('should display image when imageUrl is provided', () => {
    component.name = 'John Doe';
    component.imageUrl = 'https://example.com/avatar.jpg';
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const img = compiled.querySelector('img');
    expect(img).toBeTruthy();
    expect(img.src).toContain('avatar.jpg');
    expect(img.alt).toBe('John Doe');
  });

  it('should apply correct size class', () => {
    component.size = 'large';
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const avatar = compiled.querySelector('.avatar');
    expect(avatar.classList.contains('avatar-large')).toBeTruthy();
  });

  it('should show online status indicator when online', () => {
    component.isOnline = true;
    component.showStatus = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const statusIndicator = compiled.querySelector('.status-indicator');
    expect(statusIndicator).toBeTruthy();
    expect(statusIndicator.classList.contains('online')).toBeTruthy();
  });

  it('should handle image load error', () => {
    component.imageUrl = 'https://example.com/avatar.jpg';
    component.onImageError();
    fixture.detectChanges();

    expect(component.imageUrl).toBeUndefined();
    const compiled = fixture.nativeElement;
    const initials = compiled.querySelector('.avatar-initials');
    expect(initials).toBeTruthy();
  });

  it('should handle empty name gracefully', () => {
    component.name = '';
    const initials = component.getInitials('');
    expect(initials).toBe('?');
  });

  it('should extract first two initials from multi-word names', () => {
    const initials = component.getInitials('John Michael Doe');
    expect(initials).toBe('JM');
  });
});