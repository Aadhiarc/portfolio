import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkClass = 'dark-theme';

  toggleDarkTheme(isDark: boolean): void {
    const body = document.body;
    isDark
      ? body.classList.add(this.darkClass)
      : body.classList.remove(this.darkClass);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  loadStoredTheme(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add(this.darkClass);
    }
  }
}
