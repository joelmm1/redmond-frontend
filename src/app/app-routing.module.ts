import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'projects',
    loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule)
  },
  ...['posts', 'news', 'thought', 'press'].map(collection => {
    return  {
        path: collection,
        data: { collection: collection, handle: null },
        loadChildren: () => import('./posts/posts.module').then(m => m.PostsModule)
      }
  }, []),
  {
    path: 'contact',
    loadChildren: () => import('./forms/forms.module').then(m => m.FormsModule),
  },
   {
    path: '',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    onSameUrlNavigation: 'reload'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
