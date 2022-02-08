import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

function _document() : any {
   // return the global native browser document object
   return typeof document !== 'undefined' ? document : {};
}

@Injectable({
  providedIn: 'root'
})
export class DocumentRefService {
  isBrowser: boolean
  
  constructor(@Inject(PLATFORM_ID) platformId,
    @Inject(DOCUMENT) readonly documentRef: Document
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  get nativeDocument(): any {
    if (!this.isBrowser) return this.documentRef;
      return _document();
  }
  
}
