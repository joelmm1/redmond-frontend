import { Component, Input, NgZone, OnInit, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PageDoc } from 'src/app/models/docs.models';
import { FuncsService } from 'src/app/services/funcs.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-content-blocks',
  templateUrl: './content-blocks.component.html',
  styleUrls: ['./content-blocks.component.scss']
})
export class ContentBlocksComponent implements OnInit {

  @Input() doc: PageDoc

  @ViewChildren('appCard') appCards;

  defaultData = {
    title: null, type: null,
    link: null, linkText: null,
    image: null, aspectRatio: null, /* example >> 4:6 (must be a string of 2 numbers divided by a colon) */
    classes: { container: [], card: [], title: [] }
  }

  subscriptions: Subscription[] = []
  
  swiper: any
  editingBlock: number = null
  editingKey: string = null

  constructor(private uiService: UiService, public router: Router, private funcs: FuncsService, private ngZone : NgZone) { }

  ngOnInit(): void {
    Object.keys(this.defaultData).forEach(key => {
      !this.doc.hasOwnProperty(key) || this.doc[key] === undefined ? this.doc[key] = this.defaultData[key] : ''
    });

  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.funcs.setTimeout$(() => {
        this.uiService.triggerSizeReset()
      }, 1000)
    })
  }


  trackByFn(item, index) {
    return !!item?.docId?.length ? item.docId : index
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => !!s.unsubscribe ? s.unsubscribe() : '')
  }

}
