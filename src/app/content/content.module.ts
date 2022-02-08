import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentBlocksComponent } from '../content/content-blocks/content-blocks.component';
import { BlockCardComponent } from '../content/content-blocks/block-card/block-card.component';
import { BlockCarouselComponent } from '../content/content-blocks/block-carousel/block-carousel.component';
import { BlockCollectionComponent } from '../content/content-blocks/block-collection/block-collection.component';
import { BlockEmbedComponent } from '../content/content-blocks/block-embed/block-embed.component';
import { BlockWysiwygComponent } from '../content/content-blocks/block-wysiwyg/block-wysiwyg.component';
import { SharedModule } from '../shared/shared.module';
import { WysiwygEditorComponent } from './wysiwyg-editor/wysiwyg-editor.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { TeamCardDialogComponent } from '../shared/card/team-card-dialog/team-card-dialog.component';

const components = [
  ContentBlocksComponent,
  BlockCardComponent,
  BlockCarouselComponent,
  BlockCollectionComponent,
  BlockEmbedComponent,
  BlockWysiwygComponent,
  WysiwygEditorComponent,
  TeamCardDialogComponent
];


const modules = [
  // CKEditorModule
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
    SharedModule,
    CKEditorModule
  ],
  exports: [
    ...components,
    ...modules
  ],
  entryComponents: [
    TeamCardDialogComponent
  ],
   schemas: [
     CUSTOM_ELEMENTS_SCHEMA,
     NO_ERRORS_SCHEMA
   ]
})
export class ContentModule { }
