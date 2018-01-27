import { NgModule }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExerciseComponent } from './exercise.component';
import { AddExerciseComponent } from './add-exercise';

export const routes: Routes = [
    { path: '', component: ExerciseComponent },
    { path: 'add', component: AddExerciseComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExerciseRoutingModule { }

export const exerciseRoutingComponents = [ ExerciseComponent, AddExerciseComponent ];
