import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {WINDOW} from "@ng-web-apis/common";
function _window() : any {
   // return the global native browser window object
   return typeof window !== 'undefined' ? window : {};
}


@Injectable({
  providedIn: 'root'
})
export class WindowRefService {
isBrowser: boolean
  constructor(@Inject(PLATFORM_ID) platformId, 
    @Inject(WINDOW) readonly windowRef: Window) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  get nativeWindow(): any {
    if (!this.isBrowser) return this.windowRef;
      return _window();
   }
}
