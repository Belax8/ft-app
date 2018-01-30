import { NgModule }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExerciseComponent } from './exercise.component';

export const routes: Routes = [
    { path: '', component: ExerciseComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExerciseRoutingModule { }

export const exerciseRoutingComponents = [ ExerciseComponent ];
