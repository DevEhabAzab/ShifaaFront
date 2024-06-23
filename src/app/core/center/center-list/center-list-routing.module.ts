import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CenterListComponent } from './center-list.component';

const routes: Routes = [{ path: '', component: CenterListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CenterListRoutingModule { }
