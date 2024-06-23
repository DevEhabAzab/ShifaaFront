import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CenterComponent } from './center.component';
import { AuthGuard } from 'src/app/shared/gaurd/auth.guard';
const routes: Routes = [
  { path: '', component: CenterComponent,
  children: [
    {
      path: 'center-list',
      data:{roles:['Admin']},
      loadChildren: () =>
        import('./center-list/center-list.module').then(
          (m) => m.CenterListModule
        ),
    },
    {
      path: 'add-center',
      loadChildren: () =>
        import('./add-center/add-center.module').then(
          (m) => m.AddCenterModule
        ),
    },
    {
      path: 'add-specalist',
      loadChildren: () =>
        import('./assgin-specialist/assign-speaclist.module').then(
          (m) => m.AssignSpecalistModule
        ),
    },
    {
      path: 'edit-center',
      loadChildren: () =>
        import('./edit-center/edit-department.module').then(
          (m) => m.EditDepartmentModule
        ),
    },
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CenterRoutingModule {}
