import { Component, NgZone, OnInit } from '@angular/core';
import { FuncsService } from 'src/app/services/funcs.service';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  footerLinks

  constructor(
    private siteNav: NavigationService,
    private funcs: FuncsService,
  private ngZone: NgZone) { }

  ngOnInit() {
    this.setFooterItems()
  }

  setFooterItems(x: number = 0) {
    return this.ngZone.runOutsideAngular(() => {
      return this.funcs.setTimeout$(() => {
        if (!!this.siteNav.footer) return this.footerLinks = this.siteNav.footer.items;
        if (x > 20 || !!this.footerLinks) return;
        this.setFooterItems(x + 1);
      }, 100)
    })
  }

}
