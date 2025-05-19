import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
} from '@angular/core';
import { gsap } from 'gsap';
import SplitType from 'split-type';

@Directive({
  selector: '[flipAnimate]',
  standalone: true,
})
export class FlipAnimateDirective implements AfterViewInit {
  private title!: HTMLElement;
  private underline: HTMLElement | null = null;

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    // Split text once
    this.title = this.el.nativeElement;
    this.underline = this.title.querySelector('.underline');
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    gsap.to(this.underline, {
      scaleX: 1,
      duration: 0.5,
      ease: 'power2.out',
    });
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    gsap.to(this.underline, {
      scaleX: 0,
      duration: 0.5,
      ease: 'power2.in',
    });
  }
}
