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
import { FlipAnimateDirective } from '../../shared/directives/flip-animate.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, SwapAnimateDirective, FlipAnimateDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements AfterViewInit {
  isMenuOpen = false;
  @ViewChild('menuTitle') menuTitle!: ElementRef;
  @ViewChild('dropdownMenu') dropdownMenu!: ElementRef;
  @ViewChild('textContainer') textContainer!: ElementRef;
  private firebaseService = inject(FirebaseService);
  listOfHeaders: any[] = [];
  toggleMenu() {
    const menuHeading = this.menuTitle.nativeElement;
    const dropdown = this.dropdownMenu.nativeElement;
    const textContainer = this.textContainer.nativeElement;
    gsap.to(menuHeading, {
      duration: 0.3,
      opacity: 0,
      ease: 'power2.in',
      filter: 'blur(10px)',
      onComplete: () => {
        this.isMenuOpen = !this.isMenuOpen;
        menuHeading.innerText = this.isMenuOpen ? 'Close' : 'Menu';
        gsap.fromTo(
          menuHeading,
          { opacity: 0, filter: 'blur(10px)' },
          {
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.3,
            ease: 'power2.in',
          }
        );
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
        } else {
          gsap.to(dropdown, {
            height: 0,
            opacity: 0,
            y: -20,
            duration: 0.8,
            ease: 'power2.inOut',
            zIndex: -1,
          });
        }
      },
    });
  }

  ngAfterViewInit(): void {
    this.firebaseService.getHeaders().subscribe((data: any) => {
      console.log(data);
      this.listOfHeaders = data;
    });
  }
}
