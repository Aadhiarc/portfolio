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
      x: -150,
    opacity: 0,
    duration: 0.7, 
    ease: "power4",
    stagger: {
      each:0.05 ,
    from: 'start',  }
    });

    let percent = {value:0};
    gsap.to(percent,{
      value:100,
      duration:3,
      ease:'power4.out',
      onUpdate:()=>{
        let value = Math.floor(percent.value)
        document.getElementById('loadingText')!.textContent= value+'%'
      },
      onComplete:()=>{

      }
    })
  }

  ngOnInit(): void {
  }

}
