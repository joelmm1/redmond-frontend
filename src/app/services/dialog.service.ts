import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { TeamCardDialogComponent } from '../shared/card/team-card-dialog/team-card-dialog.component';
import { FuncsService } from './funcs.service';

@Injectable({
  providedIn: 'root'
})
export class DialogService implements OnDestroy {
subscriptions: Subscription[] = []
  constructor(private dialog: MatDialog, private funcs: FuncsService, private ngZone: NgZone) { }

  openTeamCard(doc, elem, callback = null) {
    return this.ngZone.runOutsideAngular(() => {
      return this.funcs.setTimeout$(() => {
        const dialogData: any = {
          width: 'calc(100vw - 1em)',
          maxWidth: '640px',
          minHeight: '380px',
          maxHeight: '90vh',
          backdropClass: 'view-teammate-dialog-backdrop',
          panelClass: 'view-teammate-dialog',
          closeOnNavigation: true,
          autoFocus: false,
          data: { doc }
        };
        if (!!elem) {
          dialogData.position = this.funcs.dialogPositioning(elem);
          if (!!dialogData.position.top) dialogData.position.top = '20px';
          if (parseInt(dialogData.position.top) + 20 > 0) {
            this.funcs.scrollTo({ elem, blockPosition: 'start', delay: 400 })
          }
        }
        
        const dialogRef = this.dialog.open(TeamCardDialogComponent, dialogData);
        this.subscriptions.push(dialogRef.afterClosed().pipe(take(1)).subscribe(() => {
          if (!!callback) callback();
        }));
        this.funcs.scrollTo({ elem, blockPosition: 'center' });
      }, 100
      )
    }
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => !!s?.unsubscribe ? s.unsubscribe() : '')
  }
}
