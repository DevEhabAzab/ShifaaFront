import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthGuard } from 'src/app/shared/gaurd/auth.guard';
const routes: Routes = [{ path: '', component: HomeComponent,

children: [
  {
    path: 'home-page',
    //data:{roles:['Admin']},
    //canActivate: [AuthGuard],

    loadChildren: () =>
      import('./home-page/home-page.module').then(
        (m) => m.HomePageModule
      ),
  },
  {
    path: 'doctor-search',
    //data:{roles:['Admin']},
    //canActivate: [AuthGuard],

    loadChildren: () =>
      import('./doctor-search/doctor-search.module').then(
        (m) => m.DoctorSearchModule
      ),
  },
]

 }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
