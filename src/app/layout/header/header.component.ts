import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ElementRef, Inject, Input, NgZone, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { DocumentRefService } from 'src/app/services/document-ref.service';
import { FuncsService } from 'src/app/services/funcs.service';

export enum LogoState {
  DEFAULT = 'logo-type',
  TYPE = 'logo-type',
  ICON = 'logo-icon',
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Input() scrolled: boolean
  @Input() overlayNav: boolean = false;
  @Input() isHomePage: boolean;
  isBrowser:boolean

  public isHandset$: Observable<any>

  pageLinks
  subscriptions: Subscription[] = []
  rootPage

  constructor(
    private breakpointObserver: BreakpointObserver,
    public elemRef: ElementRef,
    private route: ActivatedRoute,
    private siteNav: NavigationService,
    private documentRef: DocumentRefService,
    private funcs: FuncsService,
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) platformId) {
            this.isBrowser = isPlatformBrowser(platformId);
    
  }

  ngOnInit() {
    this.setNavigationLinks();
    if (this.isBrowser) {
      this.isHandset$ = this.breakpointObserver.observe([Breakpoints.Handset])
        .pipe(
          map(result => result.matches),
          shareReplay()
        );
    }
    return this.subscriptions.push(this.route.paramMap.subscribe((paramMap:any) => {
      this.rootPage = !!paramMap?.params?.page ? paramMap.params.page : null;
      if(!this.isBrowser || !!!this.documentRef.nativeDocument?.querySelector) return;
      return this.documentRef.nativeDocument.querySelector('html').scrollTop = 0;
    }))
  }


  get logoIcon(): LogoState {
    return !!this.isHomePage ? LogoState.TYPE : LogoState.ICON;
  }

  setNavigationLinks(x: number = 0) {
    return this.ngZone.runOutsideAngular(() => {
      return this.funcs.setTimeout$(() => {
        if (!!this.siteNav.navigation) return this.pageLinks = this.siteNav.navigation.links;
        if (x > 20 || !!this.pageLinks) return;
        this.setNavigationLinks(x + 1);
      }, 100)
    });
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach(s => !!s.unsubscribe ? s.unsubscribe() : '')
  }

}
