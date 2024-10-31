import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarFormComponent } from './car-form/car-form.component';

@NgModule({
  imports: [RouterModule.forRoot([
    {path: 'car-form', component: CarFormComponent}
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
