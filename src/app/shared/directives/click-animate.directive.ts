import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
} from '@angular/core';
import { gsap } from 'gsap';
@Directive({
  selector: '[appClickAnimate]',
})
export class ClickAnimateDirective implements AfterViewInit {
  private underline!: HTMLElement;
  private dot!: HTMLElement;
  private text!: HTMLElement;
  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.underline = this.el.nativeElement.querySelector('.underline');
    this.dot = this.el.nativeElement.querySelector('.dot');
    this.text = this.el.nativeElement.querySelector('.link');
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    gsap.to(this.underline, {
      scaleX: 0,
      duration: 0.3,
      ease: 'power2.out',
    });
    gsap.to(this.dot, {
      scale: 5,
      duration: 0.3,
      ease: 'power2.out',
    });
    gsap.to(this.el, {
      x: 10,
      duration: 0.3,
      ease: 'power2.out',
    });
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    gsap.to(this.underline, {
      scaleX: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
    gsap.to(this.dot, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
    gsap.to(this.el, {
      x: 0,
      duration: 0.3,
      ease: 'power2.out',
    });
  }
}
