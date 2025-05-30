import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { gsap } from 'gsap';

@Directive({
  selector: '[appBackgroundFill]',
})
export class BackgroundFillDirective implements OnInit {
  @Input('appBackgroundFill') fillColor: string = '#ff0000';
  @Input() duration: number = 1;

  private svgElement: SVGElement | null = null;
  private svgPaths: NodeListOf<SVGElement> | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.svgElement = this.el.nativeElement.querySelector('svg');
      if (this.svgElement) {
        this.svgPaths = this.svgElement.querySelectorAll(
          'path, circle, rect, g, polygon'
        );

        // Hover in
        this.renderer.listen(this.el.nativeElement, 'mouseenter', () => {
          this.animateFill(this.fillColor);
          gsap.to(this.svgElement, {
            y: -4,
            duration: this.duration,
            ease: 'power2.out',
          });
        });

        // Hover out
        this.renderer.listen(this.el.nativeElement, 'mouseleave', () => {
          this.animateFill('black');
          gsap.to(this.svgElement, {
            y: 0,
            duration: this.duration,
            ease: 'power2.in',
          });
        });
      }
    });
  }

  private animateFill(color: string) {
    if (!this.svgPaths) return;

    this.svgPaths.forEach((path: any) => {
      gsap.to(path, {
        duration: this.duration,
        fill: color,
        ease: 'power2.inOut',
      });
    });
  }
}
