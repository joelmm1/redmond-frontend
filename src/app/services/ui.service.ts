import { isPlatformBrowser } from "@angular/common";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { DocumentRefService } from "./document-ref.service";

@Injectable({
  providedIn: 'root'
})
export class UiService {

      private ResetSizing = new BehaviorSubject<boolean>(null);
      resetSizing = this.ResetSizing.asObservable();

      private HasOverlayNav = new BehaviorSubject<boolean>(false);
      hasOverlayNav = this.HasOverlayNav.asObservable();

      isBrowser

      constructor(private documentRef: DocumentRefService, @Inject(PLATFORM_ID) platformId) {
            this.isBrowser = isPlatformBrowser(platformId);
      }

      
      triggerSizeReset() {
             this.ResetSizing.next(true)
      }

      setHasOverlayNav(val: boolean) {
            this.HasOverlayNav.next(val)
      }

      getScrollbarWidth() {
            // Creating invisible container
            if(!!!this.isBrowser || !!!this.documentRef?.nativeDocument?.createElement) return;
            const outer:any = this.documentRef.nativeDocument.createElement('div');
            outer.style.visibility = 'hidden';
            outer.style.overflow = 'scroll'; // forcing scrollbar to appear
            outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
            this.documentRef.nativeDocument.body.appendChild(outer);
            // Creating inner element and placing it in the container
            const inner = this.documentRef.nativeDocument.createElement('div');
            outer.appendChild(inner);
            // Calculating difference between container's full width and the child width
            const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
            // Removing temporary elements from the DOM
            outer.parentNode.removeChild(outer);
            return scrollbarWidth;
      }
      

}