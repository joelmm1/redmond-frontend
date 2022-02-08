import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CollectionDoc } from 'src/app/models/collections.models';
import { PageDoc_Project } from 'src/app/models/docs.models';
import { CollectionsService } from 'src/app/services/collections.service';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit, OnDestroy {

  @Input() doc: PageDoc_Project
  @Input() aspectRatio: string = '9:6'
  @Input() collectionDoc: CollectionDoc
  sectorMap: { [key: string]: string }
  subscriptions:Subscription[] = []

  constructor(public collectionService: CollectionsService) { }

  ngOnInit(): void {
    try {
      this.sectorMap = this.collectionDoc.filters.sectors.reduce((acc, sector) => {
        return { ...acc, [sector.handle]: sector.label }
      }, {});
    } catch {
      if (this.collectionService?.collectionDocs?.projects?.pipe) {
            this.collectionService.collectionDocs.projects.pipe(switchMap(doc => {
              this.sectorMap = doc.filters.sectors.reduce((acc, sector) => {
                return { ...acc, [sector.handle]: sector.label }
              }, {});
              return of(doc)
            })).subscribe();
          }
        return 
    }
  }
  
  ngOnDestroy() {
    this.subscriptions.forEach(s => !!s?.unsubscribe ? s.unsubscribe() : '')
  }
}
