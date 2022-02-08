import { AfterViewInit, Component, ElementRef, Inject, Input, NgZone, OnInit } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ContentBlock } from 'src/app/models/entity-options.models';
import { FuncsService } from 'src/app/services/funcs.service';
import { MediaDoc } from 'src/app/models/docs.models';


@Component({
  selector: 'app-block-carousel',
  templateUrl: './block-carousel.component.html',
  styleUrls: ['./block-carousel.component.scss']
})
export class BlockCarouselComponent implements OnInit, AfterViewInit {

  @Input() block:ContentBlock
  @Input() blockIndex: number
  @Input() isHero: boolean = false
  @Input() carouselId:string
  defaults = {
    aspectRatio: '16:9',
    arrows: true,
    autoplay: 0
  }
  imageSlides: boolean
  
  slides: ContentBlock[] | MediaDoc[]

  isBrowser: boolean;
  flickityOptions: {[key:string]: any}
  flkty
  fullScreen: boolean = false;
  Flickity: any

  lastClicked: { time: number, index: number } = { time: null, index: null }
  
  firstSettle: boolean = true

  constructor(@Inject(PLATFORM_ID) platformId: Object,
    private funcs: FuncsService,
    private ngZone: NgZone) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.imageSlides = !!this.block.images;
    this.slides = !!this.block.images ? this.block.images : this.block.slides;
    if (!!!this.carouselId) this.carouselId = `carousel${this.funcs.randomInt(10000, 99999)}`;
    this.setFlickityOptions()
    this.block = { ...this.defaults, ...this.block }
  }

  ngAfterViewInit() {
    if (!!!this.isBrowser) return;
    this.initFlickity();
  }

  initFlickity(x = 0) {
    if (!!!this.isBrowser) return;
    if (!!!this.Flickity) {
      this.Flickity = require('flickity');
      require('flickity-imagesloaded');
      require('flickity-bg-lazyload');
    }
    return this.ngZone.runOutsideAngular(() => {
      return this.funcs.setTimeout$(() => {
        if (this.slides.length > 0 && !!this.isBrowser) {
          this.flkty = new this.Flickity(`#${this.carouselId}`, this.flickityOptions);
          this.funcs.setTimeout$(() => {
            return this.flkty.resize();
          }, 1000);
        }

        if (x > 20 || !!this.flkty) return;
        return this.initFlickity(x)
      }, 500);
    })
  }

  setFlickityOptions() {
    this.flickityOptions = {
      autoPlay: !!this.block?.autoplay ? this.block.autoplay : 0,
      setGallerySize: true,
      wrapAround: true,
      fullscreen: true,
      adaptiveHeight: true,
      lazyLoad: 2,
      cellAlign: 'center',
      cellSelector: '.slide',
      contain: false,
      watchCSS: true,
      on: {
        // settle: (e) => {
        //   if (!!this.firstSettle) return this.firstSettle = false;
        //   this.flkty.slider.scrollIntoView({behavior: 'smooth', block: 'center' })
        // },
        staticClick: (event, pointer, cellElement, cellIndex) => {
          const clickTime = Date.now();
          const doubleClick = clickTime - this.lastClicked.time <= 500 && cellIndex === this.lastClicked.index;
          if (!!doubleClick) this.fullScreen;
          this.lastClicked.time = clickTime;
          this.lastClicked.index = cellIndex;
        }
      }
    }
  }

  
 

}
