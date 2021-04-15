import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import {Swiper, Autoplay, Pagination} from 'swiper';
import { Movie } from '../../interfaces/cartelera-response';
Swiper.use([Autoplay]);
Swiper.use([Pagination]);

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  @Input() movies: Movie[];

  public swiper: Swiper; //undefined

  constructor() { }

  ngAfterViewInit():void{
    this.swiper = new Swiper('.swiper-container', {
      // Optional parameters
      autoplay: {
        delay: 5000,
      },
      pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
      },
    
    });
  }


  ngOnInit(): void {
    //console.log(this.movies);
  }

  onSlideNext(){
    this.swiper.slideNext();
  }

  onSlidePrev(){
    this.swiper.slidePrev();
  }

  
}
