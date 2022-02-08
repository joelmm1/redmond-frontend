import { Component, Inject, NgZone, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  Observable, of, Subscription } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { UiService } from 'src/app/services/ui.service';
import { DataService } from 'src/app/services/data.service';
import { FuncsService } from 'src/app/services/funcs.service';
import { isPlatformBrowser } from '@angular/common';
// import { TheEditor } from 'src/app/content/wysiwyg-editor/wysiwyg-editor.component';

@Component({
  selector: 'app-posts-single',
  templateUrl: './posts-single.component.html',
  styleUrls: ['./posts-single.component.scss']
})
export class PostsSingleComponent implements OnInit, OnDestroy {

  handle:string = null;
  doc: any = 'loading';
  public Editor
    // = TheEditor.Editor;
  doc$:Observable<any>
  nextPost:any
  prevPost:any
  subscriptions: Subscription[] = []
  category: string
isBrowser: boolean

  constructor(
    private uiService: UiService,
    public router: Router,
    private data: DataService,
    private funcs: FuncsService,
    private ngZone: NgZone,
    private route: ActivatedRoute,
  @Inject(PLATFORM_ID) platformId,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    
  }


  ngOnInit() {
    
    this.uiService.setHasOverlayNav(false);
    this.subscriptions.push(this.route.data.pipe( (map(data => {
      this.handle = data.handle;
      this.category = data.collection;
      if (!!!this.handle) return;
      this.doc$ = this.data.getPageByHandle(this.handle, 'posts')
        .pipe(tap((doc) => this.isBrowser ? this.getPosts(doc) : doc))
      
    }))).subscribe())
  }

  getPosts(doc) {
    const orderBy = 'publishedAt,asc';
    const postType = doc.category;
    const res = this.data.getNextPrevPosts(doc, { orderBy, postType });
    console.log(res);
    this.subscriptions.push(res.nextPost.subscribe(nextPost => {
      console.log({ nextPost });
      this.nextPost = nextPost
    }));
    this.subscriptions.push(res.prevPost.subscribe(prevPost => {
      console.log({ prevPost });
      this.prevPost = prevPost
    }));
  }

  navigateNextPrevPost(handle) {
    this.doc = 'loading';
    this.ngZone.runOutsideAngular(() => {
      this.funcs.setTimeout$(() => {
        return this.router.navigateByUrl('/' + this.category + '/' + handle)
          .catch(err => console.error(err.message))
      }, 0)
    })
  }
  
  ngOnDestroy() {
    this.subscriptions.forEach(s => !!s?.unsubscribe ? s.unsubscribe() : '')
  }

}
