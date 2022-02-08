import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, take, tap, timeout } from 'rxjs/operators';
import { DataService } from '../services/data.service';
import { SeoService } from '../services/seo.service';
// import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
// import { DEFAULT_WYSIWYG_EDITOR_CONFIG } from '../constants/wysiwyg-settings';

@Component({
  selector: 'app-testing-page',
  templateUrl: './testing-page.component.html',
  styleUrls: ['./testing-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestingPageComponent implements OnInit {
//   toolbar = [];
//   readOnly = true
// data = '<h1 class="text-5xl">WORKED 🙌 !!!</h1>'
//   public getEditor() {
//     return this.editorElem.editorInstance;
//   }
//   @ViewChild('editor') editorElem: CKEditorComponent;
//   config = { ...DEFAULT_WYSIWYG_EDITOR_CONFIG, toolbar: [] };
  public Editor
  isBrowser

  doc
  doc$:Observable<any>

  browserResponse
  serverResponse
viewing = 'browser'
  subscriptions: Subscription[] =[] 
  
  constructor(
    private cloudFunctions: AngularFireFunctions,
    private afs: AngularFirestore,
    private data: DataService,
    private http: HttpClient,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) platformId: Object, private seo: SeoService) {
    this.isBrowser = isPlatformBrowser(platformId);
    
    
  }

  ngOnInit() {
    // const collection = 'pages';
    // const handle = 'markets';
    // const collectionRef = this.afs.collection(
    //   `public/${collection}/collection`,
    //   ref => ref.where('handle', '==', handle));

    // this.subscriptions.push(this.data.pageDoc.subscribe(doc => this.doc = doc))
    const handle = this.route.snapshot.url[0].path;
    console.log({handle})
    if (handle === 'http-test')
      return this.doc$ = this.data.getPageByHandleHttp('markets', 'pages')
        .pipe(tap(res => console.log(res)));
    if (handle === 'callable-test')
      return this.doc$ = this.data.getPageByHandleCallable('markets', 'pages')
        .pipe(tap(res => console.log(res)));
    this.doc$ = this.data.getPageByHandle('markets', 'pages')
      .pipe(tap(res => console.log(res)));


    // const callDb = this.cloudFunctions.httpsCallable('callableDb');
    // this.doc$ = callDb({
    //   collection: 'pages',
    //   params: {
    //     where: [['handle', '==', 'markets']],
    //     limit: 1
    //   }
    // }).pipe(tap((res) => {
    //   this.doc = res[0];
    //   this.seo.setMetaTags({doc: this.doc})
    // }))
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => !!s?.unsubscribe ? s.unsubscribe() : '')
  }

}
