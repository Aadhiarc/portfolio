import { Routes } from '@angular/router';
import { SplashComponent } from '../splash/splash.component';
import { HomeComponent } from './home.component';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
];
