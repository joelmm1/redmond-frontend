import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {  CollectionDoc, CollectionFilterOption } from '../models/collections.models';


@Injectable({
  providedIn: 'root'
})

export class CollectionsService {

  optionsCollections: {[key:string]: Observable<CollectionFilterOption[]>}
  
  collectionDocs: { [key: string]: Observable<CollectionDoc> }
  optionsCollectionMaps: {
      [key:string]: { [key: string]: string }
    } = { }

  constructor(private db: DbService) {
    this.collectionDocs = {
      projects: this.db.doc$('public/projects'),
      posts: this.db.doc$('public/posts')
    }
    this.optionsCollections = {
      project_sectors: this.collectionDocs.projects.pipe(map((doc: CollectionDoc) => {
        this.optionsCollectionMaps['project_sectors'] = doc.filters.sectors.reduce((acc, item) => {
          acc[item.handle] = item.label;
          return acc
        }, {});
        return doc.filters.sectors
      })),
      post_categories: this.collectionDocs.posts.pipe(map((doc: CollectionDoc) => {
        this.optionsCollectionMaps['post_categories'] = doc.filters.categories.reduce((acc, item) => {
          acc[item.handle] = item.label;
          return acc
        }, {});
        return doc.filters.categories
      }))
    };
  }

}
