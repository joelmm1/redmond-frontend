


import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, Input, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import {  Subscription } from 'rxjs';

import { DEFAULT_WYSIWYG_EDITOR_CONFIG } from 'src/app/constants/wysiwyg-settings';

@Component({
  selector: 'app-wysiwyg-editor',
  templateUrl: './wysiwyg-editor.component.html',
  styleUrls: ['./wysiwyg-editor.component.scss']
})
export class WysiwygEditorComponent implements OnInit {

  @Input() data: string;
  config = { ...DEFAULT_WYSIWYG_EDITOR_CONFIG, toolbar: [] }
  
  @ViewChild( 'editor' ) editorElem: CKEditorComponent;

  public getEditor() {
      return this.editorElem.editorInstance;
  }
  

  subscriptions: Subscription[] = [];

  editor: any = null
  
  isBrowser: boolean

  public Editor
  
  constructor(@Inject(PLATFORM_ID) platformId: Object, private elemRef: ElementRef) {
      this.isBrowser = isPlatformBrowser(platformId); 
  }

  ngOnInit(): void {
    if (!!this.isBrowser)
      this.Editor = require('@ckeditor/ckeditor5-build-classic');

    this.config = { ...DEFAULT_WYSIWYG_EDITOR_CONFIG, toolbar: [] };

  }

  onReady(editor) {
    this.editor = editor;
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(s => !!s.unsubscribe ? s.unsubscribe() : '')
  }

}
