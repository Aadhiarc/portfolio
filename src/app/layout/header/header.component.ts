import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwapAnimateDirective } from '../../shared/directives/swap-animate.directive';
import { gsap } from 'gsap';
import { FirebaseService } from '../../core/service/firebase.service';
import UnderlineAnimateDirective from '../../shared/directives/underline-animate.directive';
import { ClickAnimateDirective } from '../../shared/directives/click-animate.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    SwapAnimateDirective,
    UnderlineAnimateDirective,
    ClickAnimateDirective,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements AfterViewInit {
  isMenuOpen = false;
  @ViewChild('menuTitle') menuTitle!: ElementRef;
  @ViewChild('dropdownMenu') dropdownMenu!: ElementRef;
  @ViewChild('textContainer') textContainer!: ElementRef;
  @ViewChild('hamburger') hamburger!: ElementRef;
  private firebaseService = inject(FirebaseService);
  listOfHeaders: any[] = [];
  private menuIconTl!: gsap.core.Timeline;
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    const dropdown = this.dropdownMenu.nativeElement;

    if (this.isMenuOpen) {
      gsap.fromTo(
        dropdown,
        { height: 0, opacity: 0, y: -20, zIndex: -1 },
        {
          height: '100vh',
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.inOut',
          zIndex: 999,
        }
      );

      this.menuIconTl.play();
    } else {
      gsap.to(dropdown, {
        height: 0,
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: 'power2.inOut',
        zIndex: -1,
      });

      this.menuIconTl.reverse();
    }
  }

  ngAfterViewInit(): void {
    this.firebaseService.getHeaders().subscribe((data: any) => {
      console.log(data);
      this.listOfHeaders = data;
    });
    this.menuIconTl = gsap.timeline({ paused: true, reversed: true });

    this.menuIconTl
      .to(
        '.line-1',
        {
          y: 10,
          rotation: 45,
          transformOrigin: 'center center',
          duration: 0.3,
        },
        0
      )
      .to(
        '.line-2',
        {
          opacity: 0,
          duration: 0.3,
        },
        0
      )
      .to(
        '.line-3',
        {
          y: -10,
          rotation: -45,
          transformOrigin: 'center center',
          duration: 0.3,
        },
        0
      );
  }
}
