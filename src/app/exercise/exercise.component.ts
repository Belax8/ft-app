import { Component, OnInit } from '@angular/core';

import { AuthService, CoreApiService, Exercise } from '../shared';

@Component({
  selector: 'ft-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {

  userId: number;
  completedExercises: Exercise[] = [];
  incompleteExercises: Exercise[] = [];

  constructor(private authSvc: AuthService, private coreApiSvc: CoreApiService) { }

  ngOnInit() {
    this.userId = this.authSvc.userId;
    this.getExercises();
  }

  getExercises() {
    this.coreApiSvc.get(`/users/${this.userId}/exercises?include=score,duration,exerciseType`).subscribe((result) => {
      this.completedExercises = result.filter((x) => { return x.endTime; });
      this.incompleteExercises = result.filter((y) => { return !y.endTime; });
    });
  }

}
