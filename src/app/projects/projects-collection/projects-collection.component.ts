import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, NgZone, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CollectionDoc, CollectionDocType } from 'src/app/models/collections.models';
import { PageDoc_Project } from 'src/app/models/docs.models';
import { DataService } from 'src/app/services/data.service';
import { FuncsService } from 'src/app/services/funcs.service';
import { SeoService } from 'src/app/services/seo.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-projects-collection',
  templateUrl: './projects-collection.component.html',
  styleUrls: ['./projects-collection.component.scss']
})
export class ProjectsCollectionComponent implements OnInit, OnDestroy {



  @Input() hideFilter: boolean = false
  @Input() state: string = 'page'
  @Input() activeFilter: string | null = null
  @Input() placeholder: string | null = null

  blocks = []

  filterOptions: { [key: string]: any } = { project_sectors: null };
  batchLimit: number = 6

  loadMoreSubject = new Subject();
  canLoadMore: boolean = false;


  collection: string = null
  handle: string = null
  docs$: Observable<any>
  docs: PageDoc_Project[];
  subscriptions: Subscription[] = []
  isBrowser: boolean
  collectionDoc$: Observable<any>;
  collectionDoc: CollectionDoc;
  collectionDocSubscription: Subscription;
  docsSubscription: Subscription;
  query: any;

  constructor(
    private seo: SeoService,
    private route: ActivatedRoute,
    private data: DataService,
    private uiService: UiService,
    @Inject(PLATFORM_ID) platformId,
    private funcs: FuncsService,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {



    this.uiService.setHasOverlayNav(false);

    this.subscriptions.push(this.loadMoreSubject.pipe(debounceTime(500))
      .subscribe(loadMore => this.canLoadMore = !!loadMore));

    this.subscriptions.push(this.route.fragment.subscribe(hash => {
      // console.log({ hash });
      // if (this.activeFilter === hash) return;
      this.activeFilter = hash;
      this.updateDocs()
    }))


    this.subscriptions.push(this.route.data.subscribe(data => {
      const { collection = null, collectionDoc, handle = null, query = {} } = data;
      this.collection = collection
      this.handle = handle
      this.query = query
      this.batchLimit = !!this.query.limit ? this.query.limit : null;
      this.subscriptions.push(this.data.getCollectionDoc(collection).subscribe((collectionDoc: any) => {
        this.collectionDoc = collectionDoc
        this.seo.setMetaTags({ doc: collectionDoc })
        this.activeFilter = !!this.route?.snapshot?.fragment?.length ? this.route.snapshot.fragment : 'DEFAULT';
        this.filterOptions = Object.keys(this.collectionDoc.filters).reduce((acc, key) => {
          acc[key] = [{ handle: null, label: 'All Projects' }, { handle: 'featured', label: 'Featured' }, ...this.collectionDoc.filters[key]];
          return acc;
        }, {});
      }))
      this.docs$ = this.data.getProjects(query);
      this.subscriptions.push(this.docs$.subscribe((docs) => {
        this.docs = docs
        this.loadMoreSubject.next(this.docs.length === this.batchLimit);
        return docs
      }));
    }))
  }

  get collectionHandle() {
    const sector = this.activeSector();
    if (!!sector) return this.collectionDoc.state.sector.handle.replace('{sector}', sector.handle)
  }

  get pageTitle() {
    try {
      if (!!!this.activeFilter || !!!this.collectionDoc) return 'Projects';
      const sector = this.activeSector();
      const key = this.activeFilter === 'featured' ? 'featured' : !!sector ? 'sector' : null;
      if (!!!key || !!!this.collectionDoc?.state || !!!this.collectionDoc?.state[key] || !this.collectionDoc.state[key].hasOwnProperty('title'))
        return this.collectionDoc.title;
      return this.collectionDoc.state[key].title.replace('{sector}', sector.label)
    } catch (err) {
      return 'Projects'
    }
  }

  activeSector() {
    return !!this.filterOptions?.project_sectors?.filter && !!this.filterOptions.project_sectors.filter(s => s.handle === this.activeFilter)[0] ?
      this.filterOptions.project_sectors.filter(s =>
        s.handle === this.activeFilter
      )[0] :
      null;
  }

  updateActiveFilter(selected) {
    console.log({selected})
    this.activeFilter = selected;
    this.docs = [];
    if (this.state === 'page') {
      this.router.navigate([], {
        relativeTo: this.route,
        fragment: !!this.activeFilter ? this.activeFilter : null,
        queryParamsHandling: 'merge'
      }).catch(err => { throw new Error(err.message) });
    }
    return this.updateDocs();
  }

  updateDocs() {
    const wherePublished = ['status', '==', 'published'];
    const newWhere = !!!this.activeFilter?.toLowerCase ? null : this.activeFilter.toLowerCase() === 'featured' ? ['featured', '==', true] : ['sector', '==', this.activeFilter];
    this.query = { ...this.query, where: !!!this.activeFilter ? [wherePublished] : [wherePublished, newWhere]};
    this.ngZone.runOutsideAngular(() => {
      return this.funcs.setTimeout$(() => {
        this.subscriptions.push(this.data.getProjects(this.query, null)
          .subscribe(docs => this.docs = docs));
      }, 250);
    });
  }

  loadMore() {
    if (!!!this.canLoadMore) return;
    if (!!!this.docs?.length) {
      console.error('no documents to reference startAfter');
      return this.loadMoreSubject.next(false)
    }
    const lastDoc = this.docs[this.docs.length - 1];
    if (!!!lastDoc) return this.loadMoreSubject.next(false);
    this.canLoadMore = false;
    this.subscriptions.push(this.data.getProjects(this.query, lastDoc)
      .subscribe(docs => {
        this.loadMoreSubject.next(docs.length === this.batchLimit);
        docs.forEach(doc => this.docs.push(doc));
        return docs;
      }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => !!s.unsubscribe ? s.unsubscribe() : '');
    if (!!this.docsSubscription?.unsubscribe) this.docsSubscription.unsubscribe();
    if (!!this.collectionDocSubscription?.unsubscribe) this.collectionDocSubscription.unsubscribe();
  }

}
