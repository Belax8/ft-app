import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared';
import { dashboardRoutingComponents, DashboardRoutingModule } from './dashboard.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    DashboardRoutingModule,
    SharedModule
  ],
  declarations: [
    dashboardRoutingComponents
  ],
  exports: [
  ]
})
export class DashboardModule {}
