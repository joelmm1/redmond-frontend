import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverlayModule } from '@angular/cdk/overlay';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';

import { OnVisibleDirective } from '../directives/on-visible.directive';
import { ImageLoaderDirective } from '../directives/image-loader.directive';

import { LoadingElementComponent } from './loading-element/loading-element.component';

import { CollectionFilterComponent } from './collection-filter/collection-filter.component';
import { PageHeaderComponent } from '../layout/page-header/page-header.component';

import { CardComponent } from './card/card.component';
import { ProjectCardComponent } from './card/project-card/project-card.component';
import { PostCardComponent } from './card/post-card/post-card.component';

import { GoogleAnalyticsService } from '../services/google-analytics.service';
// import { NgScrollbarModule } from 'ngx-scrollbar';


import { SmallestThumbPipe } from '../pipes/smallest-thumb.pipe';
import { StripHtmlPipe } from '../pipes/strip-html.pipe';
import { FormatStringPipe } from '../pipes/format-string.pipe';
import { SafeHtmlPipe } from '../pipes/safe-html.pipe';
import { ObjectKeysPipe } from '../pipes/object-keys.pipe';
import { SafeUrlPipe } from '../pipes/safe-url.pipe';
import { IsHoveringDirective } from '../directives/is-hovering.directive';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeamCardComponent } from './card/team-card/team-card.component';
import { TestingPageComponent } from '../testing-page/testing-page.component';


const components = [
  ImageLoaderDirective,
  OnVisibleDirective,
  IsHoveringDirective,
  FormatStringPipe,
  SafeHtmlPipe,
  ObjectKeysPipe,
  SafeUrlPipe,
  LoadingElementComponent,
  CollectionFilterComponent,
  PageHeaderComponent,
  CardComponent,
  // TeamCardComponent,
  ProjectCardComponent,
  PostCardComponent,
  SmallestThumbPipe,
  StripHtmlPipe,
  PageHeaderComponent,
  TeamCardComponent,
  TestingPageComponent
]

const materialModules = [
  MatProgressBarModule,
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatTooltipModule,
  MatSelectModule,
  MatDialogModule,
  OverlayModule
]
const modules = [
  ...materialModules,
  RouterModule,
]

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    CommonModule,
    ...modules
  ],
  exports: [
    ...components,
    ...modules
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'en-GB'
    },
    {
      provide: MatDialogRef,
      useValue: null
    },
    {
      provide: MAT_DIALOG_DATA,
      useValue: null
    },
    GoogleAnalyticsService
  ]
})
export class SharedModule { }
