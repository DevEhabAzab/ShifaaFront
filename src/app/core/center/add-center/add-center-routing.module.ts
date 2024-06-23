import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCenterComponent } from './add-center.component';

const routes: Routes = [{ path: '', component: AddCenterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddCenterRoutingModule { }
