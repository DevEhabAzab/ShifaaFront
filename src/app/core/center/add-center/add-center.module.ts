import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCenterRoutingModule } from './add-center-routing.module';
import { AddCenterComponent } from './add-center.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AddCenterComponent
  ],
  imports: [
    CommonModule,
    AddCenterRoutingModule,
    SharedModule
  ]
})
export class AddCenterModule { }
