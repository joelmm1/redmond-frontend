import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsCollectionComponent } from './projects-collection/projects-collection.component';
import { ProjectsSingleComponent } from './projects-single/projects-single.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContentModule } from '../content/content.module';


@NgModule({
  declarations: [
    ProjectsCollectionComponent,
    ProjectsSingleComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule,
    ContentModule
  ],
   schemas: [
     CUSTOM_ELEMENTS_SCHEMA,
   ]
})
export class ProjectsModule { }
