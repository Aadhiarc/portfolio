import { Routes } from '@angular/router';

export const routes: Routes = [
    {
  path: '',
  loadChildren: () => import('./features/splash/splash.routes').then(m => m.SPLASH_ROUTES)
}
];
