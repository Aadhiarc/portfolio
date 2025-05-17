import { Component } from '@angular/core';
import { SwapAnimateDirective } from '../../shared/directives/swap-animate.directive';

@Component({
  selector: 'app-header',
  imports: [SwapAnimateDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
