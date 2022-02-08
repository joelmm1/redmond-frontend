import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PageComponent } from './page/page.component';
import { ContentModule } from '../content/content.module';


@NgModule({
  declarations: [
    PageComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ContentModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    ContentModule
  ]
})
export class PagesModule { }
