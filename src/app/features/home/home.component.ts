import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  inject,
  QueryList,
  ViewChildren,
  ElementRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../layout/header/header.component';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FooterComponent } from '../../layout/footer/footer.component';
import { FirebaseService } from '../../core/service/firebase.service';
import { WordRotatorDirective } from '../../shared/directives/word-rotator.directive';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { BackgroundFillDirective } from '../../shared/directives/background-fill.directive';
import { NgxParticlesModule } from '@tsparticles/angular';



gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    FooterComponent,
    WordRotatorDirective,
    CommonModule,
    BackgroundFillDirective,
   
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private router: Router = inject(Router);
  private fireStoreService = inject(FirebaseService);
  aboutMe: string = '';
  socialMedia: any[] = [];
  subscribtions: Subscription[] = [];
  skills: any[] = [];
  projects: any[] = [];
  private sanitizer: DomSanitizer = inject(DomSanitizer);
  @ViewChildren('section') sections!: QueryList<ElementRef>;

 
ngAfterViewInit(): void {
  // Firestore data subscriptions
  this.subscribtions.push(
    this.fireStoreService.getAbout().subscribe((about) => {
      this.aboutMe = about;
    })
  );

  this.subscribtions.push(
    this.fireStoreService.getSocialMedia().subscribe((medias) => {
      this.socialMedia = medias.map((media: any) => {
        const cleanedIcon = media.icon
          .replace(/<\?xml.*?\?>/, '')
          .replace(/<!DOCTYPE.*?>/, '');
        return {
          ...media,
          icon: this.sanitizer.bypassSecurityTrustHtml(cleanedIcon),
        };
      });
    })
  );

  this.subscribtions.push(
    this.fireStoreService.getSkills().subscribe((skills) => {
      this.skills = skills;
    })
  );

  this.subscribtions.push(
    this.fireStoreService.getProjects().subscribe((projects) => {
      this.projects = projects;
    })
  );

  // Intersection observer animation
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const target = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          target.classList.add('show');
          observer.unobserve(target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  this.sections.forEach((section) => {
    observer.observe(section.nativeElement);
  });


  // Scroll & Animation setup
  this.headerScroll();
  this.profileAnimation();
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

  profileAnimation() {
    gsap.from('#photoContainer', {
      scrollTrigger: '#photoContainer',
      y: 80,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
    });
  }

  ngOnDestroy(): void {
    this.subscribtions.forEach((sub) => sub.unsubscribe());
  }
}
