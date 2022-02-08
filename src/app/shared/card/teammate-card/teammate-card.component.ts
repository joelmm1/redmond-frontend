import { Component, ElementRef, Input, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, } from '@angular/router';
import { Subscription } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { PageDoc_Team } from 'src/app/models/docs.models';
import { Location } from '@angular/common';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-teammate-card',
  templateUrl: './teammate-card.component.html',
  styleUrls: ['./teammate-card.component.scss']
})
export class TeammateCardComponent implements OnInit {

  @Input() doc: PageDoc_Team

  viewing
  subscriptions: Subscription[] = []

  constructor(
    public elemRef: ElementRef,
    private route: ActivatedRoute,
    private location: Location,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
  }

        
  setViewing(val) {
    console.log({val})
    this.viewing = val === this.viewing ? null : val;
    if (!!!this.viewing) return;
    const elem = this.elemRef.nativeElement.querySelector('.view-teammate');
    this.dialogService.openTeamCard(this.viewing, elem, () => {
      this.viewing = null;
      this.route.paramMap.pipe(take(1), tap((paramMap: any) => {
        if (paramMap?.params?.page === 'team')
          this.location.go('/team');
      }));
    })
    
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => !!s?.unsubscribe ? s.unsubscribe() : '')
  }

}
