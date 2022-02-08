import { Location } from '@angular/common';
import { Component, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ContentBlock, CardStyle } from '../../../models/entity-options.models';
import { FuncsService } from '../../../services/funcs.service';

@Component({
  selector: 'app-block-card',
  templateUrl: './block-card.component.html',
  styleUrls: ['./block-card.component.scss']
})
export class BlockCardComponent implements OnInit {

  @Input() block: ContentBlock
  @Input() hidden: boolean = false
  @Input() revealOnHover: boolean = true
  @Input() cardStyle: CardStyle
  @Input() aspectRatio: string = '1:1'
  @ViewChild('appCard') theCard


  constructor(private router: Router, private location: Location, private funcs: FuncsService, private ngZone: NgZone) { }

  ngOnInit(): void {
    if (!!this.block?.aspectRatio?.length)
      this.aspectRatio = this.block.aspectRatio;
    this.ngZone.runOutsideAngular(() => {
      this.funcs.setTimeout$(() => {
        return !!this.theCard?.cardHeightSubject?.next ? this.theCard.cardHeightSubject.next() : '';
      }, 2000);
    })
  }

  cardClicked() {
    if (!!this.block?.link) {
      if (!this.block.link.includes('.'))
        return this.router.navigateByUrl(this.block.link);
      return this.location.go(this.block.link);
    }
  }

}
