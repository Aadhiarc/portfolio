import { Directive, ElementRef, Input } from '@angular/core';

import { gsap } from 'gsap';
@Directive({
  selector: '[appWordRotator]',
})
export class WordRotatorDirective {
  @Input('appWordRotator') words: string[] = [];
  private index = 0;
  private element: HTMLElement;

  constructor(private elRef: ElementRef) {
    this.element = this.elRef.nativeElement;
  }

  ngOnInit(): void {
    if (this.words.length === 0) return;

    this.element.textContent = this.words[0];
    setInterval(() => this.animateWord(), 2500);
  }
  private animateWord(): void {
    gsap.to(this.element, {
      duration: 0.5,
      opacity: 0,
      y: -20,
      onComplete: () => {
        this.index = (this.index + 1) % this.words.length;
        this.element.textContent = this.words[this.index];

        gsap.fromTo(
          this.element,
          { opacity: 0, y: 20 },
          { duration: 0.5, opacity: 1, y: 0 }
        );
      },
    });
  }
}
