import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  inject,
  ViewChild,
} from '@angular/core';
import { FirebaseService } from '../../core/service/firebase.service';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { MailAnimateDirective } from '../../shared/directives/mail-animate.directive';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, MailAnimateDirective],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements AfterViewInit {
  @ViewChild('mail', { static: true }) mail!: ElementRef;
  mailUnderline!: HTMLElement;
  private firebaseService = inject(FirebaseService);
  listOfHeaders: any[] = [];
  ngAfterViewInit(): void {
    this.firebaseService.getHeaders().subscribe((data: any) => {
      this.listOfHeaders = data;
    });
    if (this.mail && this.mail.nativeElement) {
      this.mailUnderline = this.mail.nativeElement.querySelector('.underline');
    }
  }

  onMouseEnter() {
    const tl = gsap.timeline();

    tl.set(this.mailUnderline, { transformOrigin: 'right center', opacity: 1 });

    tl.to(this.mailUnderline, {
      scaleX: 0,
      duration: 0.6,
      ease: 'power2.out',
    });

    tl.to(
      this.mailUnderline,
      {
        scaleX: 1,
        duration: 0.6,
        transformOrigin: 'left center',
        ease: 'power2.in',
      },
      '-=0.1'
    );
  }

  onMouseLeave() {
    const tl = gsap.timeline();

    tl.set(this.mailUnderline, { transformOrigin: 'right center', opacity: 1 });

    tl.to(this.mailUnderline, {
      scaleX: 0,
      duration: 0.6,
      ease: 'power2.out',
    });

    tl.to(
      this.mailUnderline,
      {
        scaleX: 1,
        duration: 0.6,
        transformOrigin: 'left center',
        ease: 'power2.in',
      },
      '-=0.1'
    );
  }
}
