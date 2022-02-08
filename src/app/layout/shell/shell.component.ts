import { isPlatformBrowser, Location } from '@angular/common';
import { AfterViewInit, Component, HostListener, Inject, NgZone, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UiService } from '../../services/ui.service';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { FuncsService } from 'src/app/services/funcs.service';


@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit, AfterViewInit, OnDestroy {

  isHomePage: boolean;
  scrolled: boolean
  overlayNav: boolean = false
  prevScrollPosition = 0;



  scrollSubject = new Subject();

  @HostListener('window:scroll', [`$event`])
  onScroll(_event) {
    const htmlElem = _event.target.querySelector('html');
    this.scrolled = htmlElem.scrollTop > 40;
    this.scrollSubject.next(_event)
  }

  @HostListener('window:resize', [`$event`])
  onResize(_event) {
    this.setScrollbarWidth();
  }

  @ViewChild('appHeader') headerElem;
  @ViewChild('main') mainElem;
  subscriptions: Subscription[] = []
  scrollbarWidth:string = '0px'
  
  isBrowser: boolean

  constructor(
    private funcs: FuncsService,
    private uiService: UiService,
    private router: Router,
    private location: Location,
    private ngZone: NgZone,
  @Inject(PLATFORM_ID) platformId) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
  

    

    

    if (this.isBrowser) {
      this.subscriptions.push(this.router.events.subscribe(event => {
        this.isHomePage = !!!this.location.path(false)?.length
      }));
      this.subscriptions.push(this.uiService.hasOverlayNav.subscribe((val: boolean) => {
        this.overlayNav = val;
      }));
      this.ngZone.runOutsideAngular(() => {
        this.subscriptions.push(this.scrollSubject.pipe(
          debounceTime(5),
          map((event: any) => {
            const html = event.target.querySelector('html');
            this.scrolled = html.scrollTop >= 20;
            return this.scrolled
          })
        ).subscribe())
      })
    }
  }


  ngAfterViewInit() {
    if (!this.isBrowser) return 
    this.ngZone.runOutsideAngular(() => {
      this.funcs.setTimeout$(() => {
        this.setScrollbarWidth();
      }, 0)
    });
  }


  setScrollbarWidth() {
    if (!this.isBrowser) return 
    this.scrollbarWidth = `${this.uiService.getScrollbarWidth()}px`;
  }

  ngOnDestroy() {
    if (!this.isBrowser) return 
    this.subscriptions.forEach(s => !!s.unsubscribe ? s.unsubscribe() : '')
  }


}
