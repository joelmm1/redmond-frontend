import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, tap, timeout } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CollectionDocType, CollectionType, PostType } from '../models/collections.models';
import { DbQueryObject, DbService } from './db.service';
import { SeoService } from './seo.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private PageDoc = new BehaviorSubject<any>(null);
  pageDoc = this.PageDoc.asObservable();

  constructor(
    private afs: AngularFirestore,
    private http: HttpClient,
    private db: DbService, 
    private seo: SeoService, 
    private cloudFunctions: AngularFireFunctions) { }

  setPageDoc(doc) {
    this.PageDoc.next(doc)
  }

  getPageByHandleCallable(handle, collection = 'pages', findRedirects: boolean = true): Observable<any> {
    console.log('getPageByHandleCallable: ', {handle, collection})
      const callDb = this.cloudFunctions.httpsCallable('callableDb');
      return callDb({
            collection: !!collection ? collection : 'pages',
            params: {
              where: [['handle', '==', handle]],
              limit: 1
            }
      }).pipe(
        take(2),
        timeout(2000),
        catchError(e => {
          console.error(e.message)
          return of(null)
        }),
        map((res) => {
              console.log({res})
                  const doc = res[0];
                  this.seo.setMetaTags({ doc });
                  return doc
            }))
    }

  getPageByHandleHttp(handle, collection = 'pages'):Observable<any> {
    
    return this.http.get(`https://us-central1-redmond-fire${!!!environment.production ? '-dev' : ''}.cloudfunctions.net/api/db/${collection}/${handle === '/' ? 'home' : handle}`)
      .pipe(
        take(2),
        timeout(5000),
        catchError(e => {
          console.error(e.message)
          return of(null)
        }),
        tap(doc => {
          console.log({ doc })
          this.seo.setMetaTags({doc})
          return doc;
      }))
  }

  getPageByHandle(handle, collection = 'pages'): Observable<any> {
    console.log('getPageByHandle: ', {handle, collection})
    return this.afs.collection(
      `public/${collection}/collection`,
      ref => ref.where('handle', '==', handle)).get()
      .pipe(
        // map((res: any) => !!res?.length ? res[0].data() : null),
        map((res) => {
          const doc = !!res?.docs?.length ? res.docs[0].data() : null;
          this.seo.setMetaTags({ doc })
          return doc
        })
      );
  }

  
  getCollectionDocHttp(collection): Observable<any> {
    return this.http.get(`https://us-central1-redmond-fire${!!!environment.production ? '-dev' : ''}.cloudfunctions.net/api/db/collection/${collection}`)
      .pipe(
        take(2),
        timeout(5000),
        catchError(e => {
          console.error(e.message)
          return of(null)
        }),
        tap(doc => {
          console.log({ doc })
          this.seo.setMetaTags({doc})
          return doc;
      }))
  }

  getCollectionDoc(collection: CollectionDocType) {
    if (!Object.values(CollectionDocType).includes(collection)) return null;
    return this.afs.doc(`public/${collection}`).get()
      .pipe(
        map((res) => {
          const doc = res.data();
          console.log({ doc });
          this.seo.setMetaTags({ doc });
          return doc
        })
      );
  }

  getProjects(_queryObject: DbQueryObject = {}, startAfter: any = null) {
    const defaultParams = { limit: 6, orderBy: 'order,asc', where: [['status', '==', 'published'], ['order', '>=', 0]] };
    const queryObject: DbQueryObject = !!_queryObject ? _queryObject : {};
    Object.keys(defaultParams).forEach(key =>
      !queryObject.hasOwnProperty(key) ? queryObject[key] = defaultParams[key] : ''
    );
    if (!!startAfter || startAfter === 0) {
      queryObject.startAfter = startAfter
    } else if (queryObject.hasOwnProperty('startAfter')) {
      delete queryObject.startAfter
    }
    const collectionRef = this.db.collection('public/projects/collection', queryObject);
    return collectionRef.get().pipe(map((res: any) => {
      return res.docs.map(d => d.data())
    }))
  }

  getNextPrevPosts(currentPost, params: {orderBy:string, postType:PostType} ): { nextPost?: Observable<any>, prevPost?: Observable<any> } {
    const { postType = PostType.POSTS, orderBy = 'createdAt,desc' } = params;
    const orderField = orderBy.split(',')[0];
    const orderDirection = orderBy.split(',')[1].toLowerCase() === 'asc' ? 'asc' : 'desc';
    const nextPost = this.afs.collection(`public/posts/collection`,
      ref => ref.where('category', '==', postType)
        .where(orderField, orderDirection === 'asc' ? '>' : '<', currentPost[orderField])
        .orderBy(orderField, orderDirection)
        .limit(1)
    ).get().pipe(map(res => !!res?.docs?.length ?  res.docs[0].data() : null));
    const prevPost = this.afs.collection(`public/posts/collection`,
      ref => ref.where('category', '==', postType)
        .where(orderField, orderDirection === 'asc' ? '<' : '>', currentPost[orderField])
        .orderBy(orderField, orderDirection === 'asc' ? 'desc' : 'asc')
        .limit(1)
    ).get().pipe(map(res => !!res?.docs?.length ? res.docs[0].data() : null));
    return { nextPost, prevPost }
  }

}
