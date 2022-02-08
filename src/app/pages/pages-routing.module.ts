import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageHandleResolver } from '../resolvers/page-handle.resolver';
import { PageComponent } from './page/page.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PageComponent,
    data: { isHomePage: true, handle: '/', collection: 'pages' },
  },
  {
    path: ':handle',
    component: PageComponent,
    data: { collection: 'pages' },
    resolve: {
      handle: PageHandleResolver,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
