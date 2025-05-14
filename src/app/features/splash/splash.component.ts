import { AfterViewInit, Component, OnInit } from '@angular/core';
import { gsap } from 'gsap';
@Component({
  selector: 'app-splash',
  imports: [],
  templateUrl: './splash.component.html',
  styleUrl: './splash.component.scss'
})
export class SplashComponent implements OnInit ,AfterViewInit {
  constructor() {}
  ngAfterViewInit(): void {
    let split = SplitText.create('.splash-text',{
      type:'chars'
    })
     gsap.from(split.chars, {
      x: 150,
    opacity: 0,
    duration: 0.7, 
    ease: "power4",
    stagger: 0.04
    });
  }

  ngOnInit(): void {
  }

}
