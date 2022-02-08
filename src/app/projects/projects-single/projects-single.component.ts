import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { PageDoc_Project } from 'src/app/models/docs.models';
import { DataService } from 'src/app/services/data.service';
import { SeoService } from 'src/app/services/seo.service';
import { UiService } from 'src/app/services/ui.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-projects-single',
  templateUrl: './projects-single.component.html',
  styleUrls: ['./projects-single.component.scss']
})
export class ProjectsSingleComponent implements OnInit, OnDestroy {

  doc$: Observable<any>
  doc: PageDoc_Project
  isBrowser: boolean
  subscriptions: Subscription[] = []
  public verticalDevice$: Observable<any>
  handle

  sectorMap: {[key:string]:any}
  
  constructor(
    @Inject(PLATFORM_ID) platformId,
    private route: ActivatedRoute,
    private data: DataService,
    private seo: SeoService,
    private uiService: UiService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {

    this.uiService.setHasOverlayNav(false);

    this.verticalDevice$ = this.breakpointObserver.observe([
      Breakpoints.HandsetPortrait, Breakpoints.TabletPortrait, Breakpoints.WebPortrait, 
    ]).pipe(map(result => result.matches));
      // shareReplay()
    const { handle } = this.route.snapshot.data;
    this.doc$ = this.data.getPageByHandleHttp(handle, 'projects')
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => !!s?.unsubscribe ? s.unsubscribe() : '')
  }

}
