import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactPageComponent } from './contact-page/contact-page.component';


const routes: Routes = [
  {
    path: '**',
    component: ContactPageComponent,
    data: { collection: 'pages', handle: 'contact', isHomePage: false }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule { }
