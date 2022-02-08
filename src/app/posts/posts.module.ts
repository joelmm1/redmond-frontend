import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsRoutingModule } from './posts-routing.module';
import { PostsCollectionComponent } from './posts-collection/posts-collection.component';
import { PostsSingleComponent } from './posts-single/posts-single.component';
import { SharedModule } from '../shared/shared.module';
import { PagesModule } from '../pages/pages.module';
import { ContentModule } from '../content/content.module';


@NgModule({
  declarations: [
    PostsCollectionComponent,
    PostsSingleComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    SharedModule,
    PagesModule,
    ContentModule
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class PostsModule { }
