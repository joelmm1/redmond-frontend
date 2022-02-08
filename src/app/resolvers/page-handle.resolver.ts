import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';



@Injectable({ providedIn: 'root' })

export class PageHandleResolver implements Resolve<any> {

      constructor() { }

      resolve(
            route: ActivatedRouteSnapshot
      ): Observable<string | null> {
            return !!route?.params?.handle?.length ? route.params.handle :
                  !!route?.data?.handle?.length ? route.data.handle :
                        null
      }
}