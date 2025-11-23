import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HighlightDirective } from './highlight.directive';

/**
 * Test file for HighlightDirective
 *
 * Tests the standalone directive for highlighting elements
 */

// Test component to host the directive
@Component({
  standalone: true,
  imports: [HighlightDirective],
  template: `
    <div id="default" appHighlight>Default Highlight</div>
    <div id="custom" [appHighlight]="'lightblue'">Custom Color</div>
    <div id="click-mode" appHighlight [highlightOnHover]="false">Click to Highlight</div>
  `
})
class TestComponent { }

describe('HighlightDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let defaultElement: DebugElement;
  let customElement: DebugElement;
  let clickModeElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent, HighlightDirective]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    defaultElement = fixture.debugElement.query(By.css('#default'));
    customElement = fixture.debugElement.query(By.css('#custom'));
    clickModeElement = fixture.debugElement.query(By.css('#click-mode'));
  });

  it('should create the directive', () => {
    const directive = defaultElement.injector.get(HighlightDirective);
    expect(directive).toBeTruthy();
  });

  describe('hover mode (default)', () => {
    it('should highlight with default yellow color on mouse enter', () => {
      const directive = defaultElement.injector.get(HighlightDirective);
      directive.onMouseEnter();
      fixture.detectChanges();

      expect(defaultElement.nativeElement.style.backgroundColor).toBe('yellow');
    });

    it('should remove highlight on mouse leave', () => {
      const directive = defaultElement.injector.get(HighlightDirective);
      directive.onMouseEnter();
      fixture.detectChanges();
      expect(defaultElement.nativeElement.style.backgroundColor).toBe('yellow');

      directive.onMouseLeave();
      fixture.detectChanges();
      expect(defaultElement.nativeElement.style.backgroundColor).toBe('');
    });

    it('should highlight with custom color on mouse enter', () => {
      const directive = customElement.injector.get(HighlightDirective);
      directive.onMouseEnter();
      fixture.detectChanges();

      expect(customElement.nativeElement.style.backgroundColor).toBe('lightblue');
    });

    it('should restore original background color on mouse leave', () => {
      // Set an original background color
      customElement.nativeElement.style.backgroundColor = 'red';
      const directive = new HighlightDirective(new MockElementRef(customElement.nativeElement));
      directive.appHighlight = 'lightblue';

      // Manually trigger the highlight
      directive.onMouseEnter();
      expect(customElement.nativeElement.style.backgroundColor).toBe('lightblue');

      directive.onMouseLeave();
      expect(customElement.nativeElement.style.backgroundColor).toBe('red');
    });
  });

  describe('click mode', () => {
    it('should not highlight on mouse enter when highlightOnHover is false', () => {
      const directive = clickModeElement.injector.get(HighlightDirective);
      directive.onMouseEnter();
      fixture.detectChanges();

      expect(clickModeElement.nativeElement.style.backgroundColor).toBe('');
    });

    it('should toggle highlight on click', () => {
      const directive = clickModeElement.injector.get(HighlightDirective);
      // First click - highlight
      directive.onClick();
      fixture.detectChanges();
      expect(clickModeElement.nativeElement.style.backgroundColor).toBe('yellow');

      // Second click - remove highlight
      directive.onClick();
      fixture.detectChanges();
      expect(clickModeElement.nativeElement.style.backgroundColor).toBe('');
    });

    it('should toggle highlight multiple times on click', () => {
      const directive = clickModeElement.injector.get(HighlightDirective);
      // Click 1 - highlight
      directive.onClick();
      fixture.detectChanges();
      expect(clickModeElement.nativeElement.style.backgroundColor).toBe('yellow');

      // Click 2 - remove
      directive.onClick();
      fixture.detectChanges();
      expect(clickModeElement.nativeElement.style.backgroundColor).toBe('');

      // Click 3 - highlight again
      directive.onClick();
      fixture.detectChanges();
      expect(clickModeElement.nativeElement.style.backgroundColor).toBe('yellow');
    });
  });

  describe('edge cases', () => {
    it('should handle element with existing background color', () => {
      const directive = defaultElement.injector.get(HighlightDirective);
      defaultElement.nativeElement.style.backgroundColor = 'pink';

      directive.onMouseEnter();
      fixture.detectChanges();
      expect(defaultElement.nativeElement.style.backgroundColor).toBe('yellow');

      directive.onMouseLeave();
      fixture.detectChanges();
      // Should restore to empty string since it was set after directive initialization
      expect(defaultElement.nativeElement.style.backgroundColor).toBe('');
    });
  });
});

// Mock ElementRef for isolated testing
class MockElementRef {
  constructor(public nativeElement: any) {}
}