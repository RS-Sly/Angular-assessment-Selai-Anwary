import { Directive, ElementRef, HostListener, Input } from '@angular/core';

/**
 * Highlight Directive
 * Converted to standalone - can be imported directly
 */
@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  private static readonly DEFAULT_HIGHLIGHT_COLOR = 'yellow';

  @Input() appHighlight = HighlightDirective.DEFAULT_HIGHLIGHT_COLOR;
  @Input() highlightOnHover = true;

  private readonly originalBackground: string;

  constructor(private el: ElementRef) {
    this.originalBackground = this.el.nativeElement.style.backgroundColor;
  }

  @HostListener('mouseenter') onMouseEnter() {
    if (this.highlightOnHover) {
      // Use default color if appHighlight is empty string
      const color = this.appHighlight || HighlightDirective.DEFAULT_HIGHLIGHT_COLOR;
      this.highlight(color);
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.highlightOnHover) {
      this.highlight(this.originalBackground);
    }
  }

  @HostListener('click') onClick() {
    if (!this.highlightOnHover) {
      const color = this.appHighlight || HighlightDirective.DEFAULT_HIGHLIGHT_COLOR;
      const currentColor = this.el.nativeElement.style.backgroundColor;
      if (currentColor === color) {
        this.highlight(this.originalBackground);
      } else {
        this.highlight(color);
      }
    }
  }

  private highlight(color: string | null) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}