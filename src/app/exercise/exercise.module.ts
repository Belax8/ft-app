import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared';
import { exerciseRoutingComponents, ExerciseRoutingModule } from './exercise.routing';
import { ExerciseModalComponent } from './exercise-modal';
import { StartExerciseModalComponent } from './start-exercise-modal';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ExerciseRoutingModule,
    SharedModule
  ],
  declarations: [
    exerciseRoutingComponents,
    ExerciseModalComponent,
    StartExerciseModalComponent
  ],
  exports: [
  ]
})
export class ExerciseModule {}
