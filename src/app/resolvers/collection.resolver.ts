import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';



@Injectable({ providedIn: 'root' })

export class CollectionResolver implements Resolve<any> {

      constructor() { }

      resolve(
            route: ActivatedRouteSnapshot
      ): Observable<any> {
             return !!route?.data?.collection?.length ? route?.data?.collection : null
      }
}