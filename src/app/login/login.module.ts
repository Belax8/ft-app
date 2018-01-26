import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared';
import { loginRoutingComponents, LoginRoutingModule } from './login.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    LoginRoutingModule,
    SharedModule
  ],
  declarations: [
    loginRoutingComponents
  ],
  exports: [
  ]
})
export class LoginModule {}