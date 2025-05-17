import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private router: Router = inject(Router);
  ngOnInit(): void {
    const navigationType = performance.getEntriesByType(
      'navigation'
    )[0] as PerformanceNavigationTiming;
    const isReload = navigationType.type === 'reload';
    const actualPath = window.location.pathname;

    if (isReload && actualPath === '/home') {
      this.router.navigate(['/']);
    }
  }
  title = 'Portfolio';
}
