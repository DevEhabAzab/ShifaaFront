import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from 'src/app/shared/gaurd/auth.guard';

const routes: Routes = [
  { path: '', component: DashboardComponent,
  children: [
    {
      path: '',
      redirectTo:'admin-dashboard',
      pathMatch:'full'
    },
    {
      path: 'admin-dashboard',
      data:{roles:['Admin']},
      canActivate: [AuthGuard],
    loadChildren: () =>
        import('./admin-dashboard/admin-dashboard.module').then(
          (m) => m.AdminDashboardModule
        ),
    },
    {
      path: 'doctor-dashboard',
      data:{roles:['Admin']},
      canActivate: [AuthGuard],
      loadChildren: () =>
        import('./doctor-dashboard/doctor-dashboard.module').then(
          (m) => m.DoctorDashboardModule
        ),
    },
    {
      path: 'patient-dashboard',
      data:{roles:['Patient']},
      canActivate: [AuthGuard],
      loadChildren: () =>
        import('./patient-dashboard/patient-dashboard.module').then(
          (m) => m.PatientDashboardModule
        ),
    },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
