import {  Component, Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { environment } from '../environments/environment'
import { ScrollingService } from './services/scrolling.service';
import { UiService } from './services/ui.service';
declare let gtag: Function;
import {
  NAVIGATOR,
  PAGE_VISIBILITY,
  PERFORMANCE,
  USER_AGENT,
  WINDOW,
  LOCATION,
  LOCAL_STORAGE,
  SESSION_STORAGE,
  SPEECH_RECOGNITION,
  SPEECH_SYNTHESIS
} from "@ng-web-apis/common";
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'Redmond Construction';
  isHomePage: boolean
  hasOverlayNav: boolean

  subscriptions: Subscription[] = []

  constructor(
    public router: Router,
    private scrollService: ScrollingService,
    private uiService: UiService,
    @Inject(WINDOW) readonly windowRef: Window,
    @Inject(NAVIGATOR) readonly navigator: Navigator,
    @Inject(USER_AGENT) readonly userAgent: string,
    @Inject(PERFORMANCE) private readonly performance: Performance,
    @Inject(PAGE_VISIBILITY) readonly pageVisibility$: Observable<boolean>,
    @Inject(LOCATION) readonly location: Location,
    @Inject(LOCAL_STORAGE) readonly localStorage: Storage,
    @Inject(SESSION_STORAGE) readonly sessionStorage: Storage,
    @Inject(SPEECH_RECOGNITION) readonly speechRecognition,
    @Inject(SPEECH_SYNTHESIS) readonly speechSynthesis: SpeechSynthesis,
  ) {

    this.subscriptions.push(this.uiService.hasOverlayNav
      .subscribe(hasOverlayNav => this.hasOverlayNav = hasOverlayNav))

    this.subscriptions.push(this.router.events.subscribe(event => {
      this.scrollService.scrollToTopAfterPageChange()
      if (!!environment.ga)
        if (event instanceof NavigationEnd) {
          if (typeof gtag === 'undefined') return null;
          gtag('config', 'UA-98488498-1',
            { 'page_path': event.urlAfterRedirects }
          );
        }
    }))
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => !!s?.unsubscribe ? s.unsubscribe() : '')
  }
  
}
