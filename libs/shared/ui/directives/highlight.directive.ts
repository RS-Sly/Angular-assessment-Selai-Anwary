import { Directive, ElementRef, HostListener, Input } from '@angular/core';

/**
 * Highlight Directive
 * Part of SharedUiModule - needs to be converted to standalone
 *
 * TODO: Add standalone: true and any required imports
 */
@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input() appHighlight = 'yellow';
  @Input() highlightOnHover = true;

  private originalBackground: string;

  constructor(private el: ElementRef) {
    this.originalBackground = this.el.nativeElement.style.backgroundColor;
  }

  @HostListener('mouseenter') onMouseEnter() {
    if (this.highlightOnHover) {
      this.highlight(this.appHighlight);
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.highlightOnHover) {
      this.highlight(this.originalBackground);
    }
  }

  @HostListener('click') onClick() {
    if (!this.highlightOnHover) {
      const currentColor = this.el.nativeElement.style.backgroundColor;
      if (currentColor === this.appHighlight) {
        this.highlight(this.originalBackground);
      } else {
        this.highlight(this.appHighlight);
      }
    }
  }

  private highlight(color: string | null) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}