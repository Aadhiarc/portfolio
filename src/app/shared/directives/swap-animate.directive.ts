import {
  Directive,
  ElementRef,
  HostListener,
  AfterViewInit,
} from '@angular/core';
import { gsap } from 'gsap';
import { repeat } from 'rxjs';

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
      yPercent: -100,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
    });

    gsap.to(this.bottomText, {
      yPercent: 0,
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
    });
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (!this.topText || !this.bottomText) return;

    gsap.to(this.topText, {
      yPercent: 0,
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
    });

    gsap.to(this.bottomText, {
      yPercent: 100,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
    });
  }
}
