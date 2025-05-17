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

    const percent = { value: 0 };

    const timeline = gsap.timeline({
      onUpdate: () => {
        const value = Math.floor(percent.value);
        document.getElementById('loadingText')!.textContent = `${value}%`;
      },
      onComplete: () => {
        this.router.navigate(['home']);
      },
    });

    // Animate percent and character entry together
    timeline.to(
      percent,
      {
        value: 100,
        duration: 2,
        ease: 'power4.out',
      },
      0
    );

    timeline.from(
      split.chars,
      {
        x: -150,
        opacity: 0,
        duration: 2,
        ease: 'power4.inOut',
        stagger: {
          each: 0.05,
          from: 'start',
        },
      },
      0
    );

    // Animate both split chars and percentage text out together
    timeline.to(
      split.chars,
      {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        stagger: {
          each: 0.05,
          from: 'end',
        },
      },
      'fadeOut'
    ); // using a label for synchronization

    timeline.to(
      '#loadingText',
      {
        y: -20,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
      },
      'fadeOut'
    ); // syncs with the split.chars out animation

    timeline.timeScale(2.0);
  }

  ngOnInit(): void {}
}
