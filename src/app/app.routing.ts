import { NgModule }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard, LoginLayoutComponent, MainLayoutComponent } from './shared';


export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    //canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule' },
      { path: 'exercise', loadChildren: 'app/exercise/exercise.module#ExerciseModule' },
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
