import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsRoutingModule } from './forms-routing.module';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { TextFieldModule } from '@angular/cdk/text-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ContactFormsComponent } from './contact-forms/contact-forms.component';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';



const materialModules = [
  MatSelectModule,
  TextFieldModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonToggleModule,
  ReactiveFormsModule,
  MatExpansionModule,
  MatButtonModule
]


@NgModule({
  declarations: [
    ContactPageComponent,
    ContactFormsComponent
  ],
  imports: [
    CommonModule,
    FormsRoutingModule,
    SharedModule,
    ...materialModules
  ],
   schemas: [
     CUSTOM_ELEMENTS_SCHEMA,
   ]
})
export class FormsModule { }
