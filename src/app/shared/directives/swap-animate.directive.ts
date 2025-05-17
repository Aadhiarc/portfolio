import {
  Directive,
  ElementRef,
  HostListener,
  AfterViewInit,
} from '@angular/core';
import { gsap } from 'gsap';

@Directive({
  selector: '[swapAnimate]',
  standalone: true,
})
export class SwapAnimateDirective implements AfterViewInit {
  private topText!: HTMLElement;
  private bottomText!: HTMLElement;

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.topText = this.el.nativeElement.querySelector('.text-top');
    this.bottomText = this.el.nativeElement.querySelector('.text-bottom');

    if (!this.topText || !this.bottomText) {
      console.warn('swapAnimate: Required elements not found');
    }
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    if (!this.topText || !this.bottomText) return;

    gsap.to(this.topText, {
      yPercent: -100, // slide up out
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out',
    });

    gsap.to(this.bottomText, {
      yPercent: 0, // come to original place
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out',
    });
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (!this.topText || !this.bottomText) return;

    gsap.to(this.topText, {
      yPercent: 0, // back to original
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out',
    });

    gsap.to(this.bottomText, {
      yPercent: 100, // move down offscreen
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out',
    });
  }
}
