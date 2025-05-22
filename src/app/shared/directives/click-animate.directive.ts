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
    this.text = this.el.nativeElement;
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    gsap.to(this.underline, {
      scaleX: 0,
      duration: 0.3,
      ease: 'power2.out',
    });
    // gsap.to(this.dot, {
    //   scale: 3,
    //   duration: 0.3,
    //   ease: 'power2.out',
    // });
    // gsap.to(this.text, {
    //   x: 10,
    //   duration: 0.3,
    //   ease: 'power2.out',
    // });
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    gsap.to(this.underline, {
      scaleX: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
    // gsap.to(this.dot, {
    //   scale: 1,
    //   duration: 0.3,
    //   ease: 'power2.out',
    // });
    // gsap.to(this.text, {
    //   x: 0,
    //   duration: 0.3,
    //   ease: 'power2.out',
    // });
  }
}
