import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import { DEFAULT_WYSIWYG_EDITOR_CONFIG } from 'src/app/constants/wysiwyg-settings';



@Component({
  selector: 'app-block-wysiwyg',
  templateUrl: './block-wysiwyg.component.html',
  styleUrls: ['./block-wysiwyg.component.scss']
})
export class BlockWysiwygComponent implements OnInit {

  toolbar = [];
  readOnly = true
data = '<h1 class="text-5xl">WORKED 🙌 !!!</h1>'
  public getEditor() {
    return this.editorElem.editorInstance;
  }
  @ViewChild('editor') editorElem: CKEditorComponent;
  config = { ...DEFAULT_WYSIWYG_EDITOR_CONFIG, toolbar: [] };
  public Editor
  isBrowser
  
  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId); 
  }

  ngOnInit(): void {
    if (!!this.isBrowser)
      this.Editor = require('@ckeditor/ckeditor5-build-classic');
  }

}
