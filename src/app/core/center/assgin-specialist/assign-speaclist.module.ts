import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { AssignSpecalistRoutingModule } from './assign-specalist.routing.module';
import { AssginSpecialistComponent } from './assgin-specialist.component';
@NgModule({
  declarations: [
    AssginSpecialistComponent
  ],
  imports: [
    CommonModule,
    AssignSpecalistRoutingModule,
    SharedModule
  ]
})
export class AssignSpecalistModule { }
