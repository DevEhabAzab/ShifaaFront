import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CenterListRoutingModule } from './center-list-routing.module';
import { CenterListComponent } from './center-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CenterListComponent
  ],
  imports: [
    CommonModule,
    CenterListRoutingModule,
    SharedModule
  ]
})
export class CenterListModule { }
