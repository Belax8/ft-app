import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { AuthService, CoreApiService, Exercise } from '../shared';

@Component({
  selector: 'ft-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {

  userId: number;

  allExercises: Exercise[] = [];
  completedExercises: Exercise[] = [];
  incompleteExercises: Exercise[] = [];

  selectedExercise: Exercise;
  showEditModal: boolean = false;
  showStartModal: boolean = false;

  constructor(private authSvc: AuthService, private coreApiSvc: CoreApiService) { }

  ngOnInit() {
    this.userId = this.authSvc.userId;
    this.getExercises();
  }

  getExercises() {
    this.coreApiSvc.get(`/users/${this.userId}/exercises?include=score,duration,exerciseType`).subscribe((result) => {
      this.allExercises = result;
      this.completedExercises = result.filter((x) => { return x.endTime; });
      this.incompleteExercises = result.filter((y) => { return !y.endTime; });
    });
  }

  endExercise(exerciseId: number) {
    this.coreApiSvc.put(`/exercises/${exerciseId}`, {endTime: moment().toISOString()}).subscribe((result) => {
      this.getExercises();
    });
  }

  openModal(exerciseId: number) {
    this.selectedExercise = this.allExercises.filter((x) => { return x.id == exerciseId;})[0];
    this.showEditModal = true;
  }

  manualEditModal() {
    this.selectedExercise = new Exercise();
    this.showEditModal = true;
  }

  onModalClose() {
    this.showStartModal = false;
    this.showEditModal = false;
    this.getExercises();
  }

}
