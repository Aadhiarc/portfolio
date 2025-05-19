import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { gsap } from 'gsap';
@Component({
  selector: 'app-splash',
  imports: [],
  templateUrl: './splash.component.html',
  styleUrl: './splash.component.scss',
})
export class SplashComponent implements OnInit, AfterViewInit {
  private router: Router = inject(Router);
  constructor() {}
  ngAfterViewInit(): void {
    const split = SplitText.create('.splash-text', {
      type: 'chars',
    });

    const chars = split.chars;
    const percent = { value: 0 };

    const fadeInDuration = 1;
    const fadeOutDuration = 1;
    const fadeInStagger = 0.05;
    const fadeOutStagger = 0.05;

    const fadeInTime = fadeInDuration + fadeInStagger * (chars.length - 1);
    const fadeOutTime = fadeOutDuration + fadeOutStagger * (chars.length - 1);

    const totalDuration = fadeInTime + fadeOutTime;

    const timeline = gsap.timeline({
      onUpdate: () => {
        const value = Math.floor(percent.value);
        document.getElementById('loadingText')!.textContent = `${value}%`;
      },
      onComplete: () => {
        this.router.navigate(['home']);
      },
    });

    timeline.to(
      percent,
      {
        value: 100,
        duration: totalDuration,
        ease: 'linear',
      },
      0
    );

    timeline.from(
      chars,
      {
        x: -150,
        opacity: 0,
        duration: fadeInDuration,
        ease: 'power4.inOut',
        stagger: {
          each: fadeInStagger,
          from: 'start',
        },
      },
      0
    );

    timeline.to(
      chars,
      {
        y: -50,
        opacity: 0,
        duration: fadeOutDuration,
        ease: 'power4.out',
        stagger: {
          each: fadeOutStagger,
          from: 'end',
        },
      },
      fadeInTime
    );

    timeline.to(
      '#loadingText',
      {
        y: -20,
        opacity: 0,
        duration: fadeOutDuration,
        ease: 'power4.out',
      },
      totalDuration
    );

    timeline.timeScale(1.5);
  }

  ngOnInit(): void {}
}
