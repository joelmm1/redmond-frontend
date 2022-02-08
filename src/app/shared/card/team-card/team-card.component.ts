import { Component, ElementRef, Input, NgZone, OnInit } from '@angular/core';
// import { TeamCardDialogComponent } from '../team-card-dialog/team-card-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { PageDoc_Team } from 'src/app/models/docs.models';
import { FuncsService } from 'src/app/services/funcs.service';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { TeamCardDialogComponent } from '../team-card-dialog/team-card-dialog.component';


@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styles: [`./team-card.component.scss`]
})
export class TeamCardComponent implements OnInit {

  @Input() doc: PageDoc_Team

  viewing
  subscriptions: Subscription[] = []

  constructor(public elemRef: ElementRef,
    private funcs: FuncsService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private location: Location,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
  }

  setViewing(val) {
    this.viewing = val === this.viewing ? null : val;
    if (!!!this.viewing) return;
    return this.ngZone.runOutsideAngular(() => {
      return this.funcs.setTimeout$(() => {
        const elem = this.elemRef.nativeElement.querySelector('.view-teammate');
        const dialogData: any = {
          width: 'calc(100vw - 1em)',
          maxWidth: '640px',
          minHeight: '380px',
          maxHeight: '90vh',
          backdropClass: 'view-teammate-dialog-backdrop',
          panelClass: 'view-teammate-dialog',
          closeOnNavigation: true,
          autoFocus: false,
          data: { doc: this.viewing }
        };
        if (!!elem) {
          dialogData.position = this.funcs.dialogPositioning(elem);
          if (!!dialogData.position.top) dialogData.position.top = '20px';
          if (parseInt(dialogData.position.top) + 20 > 0) {
            this.funcs.scrollTo({ elem, blockPosition: 'start', delay: 400 })
          }
        }
        
        this.dialog.open(TeamCardDialogComponent, dialogData);
        // dialogRef.afterClosed().pipe(take(1)).toPromise().then(() => {
        //   this.viewing = null;
        // });
        // this.funcs.scrollTo({ elem, blockPosition: 'center' });
      }, 100
      )
    }
    );
  }

}
