import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
} from '@angular/core';

import { gsap } from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

gsap.registerPlugin(ScrambleTextPlugin);

@Directive({
  selector: '[scrambleAnimate]',
  standalone: true,
})
export class ScrambleDirective implements AfterViewInit {
  private text!: HTMLElement;
  constructor(private el: ElementRef) {}
  ngAfterViewInit(): void {
    this.text = this.el.nativeElement;
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    if (this.text === null) return;
    gsap.to(this.text, {
      duration: 1,
      scrambleText: {
        text: 'Aadhi',
        chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
        revealDelay: 0.5,
        speed: 0.3,
        newClass: 'myClass',
      },
    });
  }

  @HostListener('mouseleave')
  onMouseLeave() {}
}
