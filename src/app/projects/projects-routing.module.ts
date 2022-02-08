import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollectionQueryResolver } from 'src/app/resolvers/collection-query.resolver';
import { PageHandleResolver } from 'src/app/resolvers/page-handle.resolver';
import { ProjectsCollectionComponent } from './projects-collection/projects-collection.component';
import { ProjectsSingleComponent } from './projects-single/projects-single.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    data: { collection: 'projects', handle: null },
    resolve: {
      query: CollectionQueryResolver,
      // collectionDoc: CollectionDocResolver
    },
    component: ProjectsCollectionComponent
  },
  {
    path: ':handle',
    data: { collection: 'projects' },
    resolve: {
      handle: PageHandleResolver,
    },
    component: ProjectsSingleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
