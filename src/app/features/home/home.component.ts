import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../layout/header/header.component';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FooterComponent } from '../../layout/footer/footer.component';
import { FirebaseService } from '../../core/service/firebase.service';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, AfterViewInit {
  private router: Router = inject(Router);
  private fireStoreService = inject(FirebaseService);
  aboutMe: string = '';
  ngAfterViewInit(): void {
    this.fireStoreService.getAbout().subscribe((about) => {
      this.aboutMe = about;
    });
    this.headerScroll();
  }
  ngOnInit(): void {}

  headerScroll() {
    const header = document.querySelector('app-header') as HTMLElement;

    if (header) {
      let previousScroll = window.scrollY;
      let isHidden = false;

      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          const currentScroll = self.scroll();

          // Scroll down and past 100px
          if (
            currentScroll > previousScroll &&
            currentScroll > 100 &&
            !isHidden
          ) {
            gsap.to(header, {
              y: -header.offsetHeight,
              duration: 0.3,
              ease: 'power2.out',
            });
            isHidden = true;
          }

          // Scroll up
          if (currentScroll < previousScroll && isHidden) {
            gsap.to(header, {
              y: 0,
              duration: 0.3,
              ease: 'power2.in',
            });
            isHidden = false;
          }

          previousScroll = currentScroll;
        },
      });
    }
  }
}
