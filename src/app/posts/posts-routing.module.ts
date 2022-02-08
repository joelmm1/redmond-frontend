import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollectionQueryResolver } from '../resolvers/collection-query.resolver';
import { CollectionResolver } from '../resolvers/collection.resolver';
import { PageHandleResolver } from '../resolvers/page-handle.resolver';
import { PostsCollectionComponent } from './posts-collection/posts-collection.component';
import { PostsSingleComponent } from './posts-single/posts-single.component';


const routes: Routes = [
  {
    path: '',
    component: PostsCollectionComponent,
    data: { handle: null },
    resolve: {
      query: CollectionQueryResolver,
      collection: CollectionResolver
    }
  },
  {
    path: `:handle`,
    component: PostsSingleComponent,
    resolve: {
      collection: CollectionResolver,
      handle: PageHandleResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
