import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { animatedList, RevealContentAndChildren } from '../../../constants/animations';

@Component({
  templateUrl: './team-card-dialog.component.html',
  styleUrls: ['./team-card-dialog.component.scss'],
  animations: [...RevealContentAndChildren, ...animatedList]
})
export class TeamCardDialogComponent implements OnInit {

  doc
  
  constructor(
    private dialogRef: MatDialogRef<TeamCardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.doc = data.doc
    }
  
  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
    // this.dialogRef.closeAll();
    setTimeout(() => {
      console.log({ref: this.dialogRef })
    }, 500)
  }

  
}
