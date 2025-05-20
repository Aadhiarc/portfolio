import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../layout/header/header.component';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  imports: [HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    const header = document.querySelector('app-header') as HTMLElement;

    let previousScroll = window.scrollY;

    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const currentScroll = self.scroll();
        if (currentScroll > previousScroll && currentScroll > 100) {
          gsap.to(header, {
            y: -100,
            duration: 0.4,
            ease: 'power2.out',
          });
        } else {
          gsap.to(header, {
            y: 0,
            duration: 0.5,
            ease: 'power2.in',
          });
        }

        previousScroll = currentScroll;
      },
    });
  }
  private router: Router = inject(Router);
  ngOnInit(): void {}
}
