import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'

declare let gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {


      public eventEmitter( 
            eventName: string, 
            eventCategory: string, 
            eventAction: string, 
            eventLabel: string = null,  
            eventValue: number = null) {
            if (typeof gtag === 'undefined' || !!!environment.ga) return null;
            gtag('event', eventName, { 
                        eventCategory: eventCategory, 
                        eventLabel: eventLabel, 
                        eventAction: eventAction, 
                        eventValue: eventValue
                  })
      }
        
      constructor() { }

      

}
