import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DataService } from '../services/data.service';

// import { AngularFirestore } from '@angular/fire/firestore';
// import { AngularFireFunctions } from '@angular/fire/functions';
// import { catchError, map, take, tap, timeout } from 'rxjs/operators';
// import { SeoService } from '../services/seo.service';



@Injectable({ providedIn: 'root' })

export class PageResolver implements Resolve<any> {

      constructor(
            private data: DataService
            // private afs: AngularFirestore, private seo: SeoService, private cloudFunctions: AngularFireFunctions
      ) { }

      resolve(
            route: ActivatedRouteSnapshot
      ): Observable<any> {
            console.log('route: ', route);
            let handle = route.data.handle;
            const { collection = null } = route.data;
            if (!!!handle) handle = route.paramMap.get('handle');
            if (!!!handle) return of(null);
            if (handle.includes('test') || handle === 'test')
                  handle === 'markets';
            console.log({route, params: route.params, handle})
            return this.data.getPageByHandleHttp(handle, collection)
            // if(route.url[0].path === 'test2')
            //       return callDb({
            //             collection: 'pages',
            //             params: {
            //             where: [['handle', '==', 'markets']],
            //             limit: 1
            //             }
            //       }).pipe(
            //             take(2),
            //             timeout(2000),
            //             catchError(e => {
            //                   console.log(e.message)
            //                   return of(null)
            //             }),
            //             tap((res) => {
            //                   if (!!!res) return res;
            //             const doc = res[0];
            //             this.seo.setMetaTags({ doc });
            //             this.data.setPageDoc(doc)
            //             return doc
            //       }))
            // if(route.url[0].path === 'test1')
            //       return callDb({
            //             collection: 'pages',
            //             params: {
            //             where: [['handle', '==', 'markets']],
            //             limit: 1
            //             }
            //       }).pipe(
            //             take(1),
            //             tap((res) => {
            //                   const doc = res[0];
            //                   this.seo.setMetaTags({ doc });
            //                   this.data.setPageDoc(doc)
            //                   return doc
            //             }))
            // if(route.url[0].path === 'test3')
            //       return callDb({
            //             collection: 'pages',
            //             params: {
            //             where: [['handle', '==', 'markets']],
            //             limit: 1
            //             }
            //       }).pipe(
            //             tap((res) => {
            //             const doc = res[0];
            //             this.seo.setMetaTags({ doc });
            //             this.data.setPageDoc(doc)
            //             return doc
            //             }))
            // return this.afs.collection(
            //       `public/pages/collection`,
            //       ref => ref.where('handle', '==', 'markets')).get()
            //       .pipe(tap((res) => {
            //             const doc = res?.docs?.length ? res.docs[0].data() : null;
            //             if (!!!doc) return doc;
            //             this.seo.setMetaTags(doc);
            //             this.data.setPageDoc(doc);
            //             return doc;
            //       }));
      }
}