import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DoctorSearchComponent } from './doctor-search.component';
const routes: Routes = [{ path: '', component: DoctorSearchComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorSearchRoutingModule { }
