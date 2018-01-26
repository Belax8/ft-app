import { NgModule }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard, LoginLayoutComponent, MainLayoutComponent } from './shared';


export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    //canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'profile', loadChildren: 'app/profile/profile.module#ProfileModule' }
    ]
  },
  {
    path: 'auth',
    component: LoginLayoutComponent,
    loadChildren: 'app/login/login.module#LoginModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

export const appRoutingComponents = [ ];
