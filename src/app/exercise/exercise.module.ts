import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared';
import { exerciseRoutingComponents, ExerciseRoutingModule } from './exercise.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ExerciseRoutingModule,
    SharedModule
  ],
  declarations: [
    exerciseRoutingComponents
  ],
  exports: [
  ]
})
export class ExerciseModule {}
