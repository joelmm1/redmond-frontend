import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { off } from 'process';
import { Observable, of, Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageComponent implements OnInit, OnDestroy {

  collection: string = null
  handle: string = null
  doc$: Observable<any>
  doc: any
  subscriptions: Subscription[] = []
  routeSubscription: Subscription
  isBrowser: boolean
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private data: DataService,
    private uiService: UiService,
    @Inject(PLATFORM_ID) platformId
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    
    
      this.setPage(this.route.snapshot.data)
      
  }

  setPage(data) {
    const { collection = null, handle = null } = data;
    this.collection = collection
    this.handle = handle
    this.uiService.setHasOverlayNav(this.handle === '/');
    console.log({ handle, collection })
    this.doc$ = this.data.getPageByHandle(handle, collection);
    if (!!!this.routeSubscription?.unsubscribe) {
      this.routeSubscription = this.router.events.subscribe(e => {
        if (e instanceof NavigationEnd)
          this.setPage(this.route.snapshot.data)
      })
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => !!s.unsubscribe ? s.unsubscribe() : '')
    if (!!this.routeSubscription.unsubscribe)
      this.routeSubscription.unsubscribe()
  }

}
