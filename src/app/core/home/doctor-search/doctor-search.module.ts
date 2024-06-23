import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorSearchComponent } from './doctor-search.component';
import { DoctorSearchRoutingModule } from './doctor-search-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';  // <-- Import FormsModule
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu'; // Import MatMenuModule
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule if not already imported



@NgModule({
  declarations: [
    DoctorSearchComponent
  ],
  imports: [
    CommonModule,
    DoctorSearchRoutingModule,
    SharedModule,
    MatPaginatorModule,
    FormsModule,
    MatButtonToggleModule,
    MatIconModule,
    MatMenuModule,MatButtonModule
  ]
})
export class DoctorSearchModule { }
