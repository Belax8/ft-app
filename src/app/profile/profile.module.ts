import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared';
import { profileRoutingComponents, ProfileRoutingModule } from './profile.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ProfileRoutingModule,
    SharedModule
  ],
  declarations: [
    profileRoutingComponents
  ],
  exports: [
  ]
})
export class ProfileModule {}