import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { DoctorSearchComponent } from './doctor-search/doctor-search.component';
import { DoctorSearchRoutingModule } from './doctor-search/doctor-search-routing.module';

@NgModule({
  declarations: [
    HomeComponent,
    //DoctorSearchComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
DoctorSearchRoutingModule
  ]
})
export class HomeModule { }
