import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
} from '@angular/core';

import { gsap } from 'gsap';

@Directive({
  selector: '[footerAnimate]',
})
export class MailAnimateDirective implements AfterViewInit {
  private underline!: HTMLElement;

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.underline = this.el.nativeElement.querySelector('.underline');
    // Set initial transform origin and scale
    gsap.set(this.underline, {
      scaleX: 0,
      transformOrigin: 'left center',
    });
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    gsap.set(this.underline, {
      transformOrigin: 'left center',
    });
    gsap.to(this.underline, {
      scaleX: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    gsap.set(this.underline, {
      transformOrigin: 'right center',
    });
    gsap.to(this.underline, {
      scaleX: 0,
      duration: 0.3,
      ease: 'power2.out',
    });
  }
}
