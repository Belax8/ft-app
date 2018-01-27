import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { AuthService, CoreApiService, FitnessPlan, Exercise, User } from '../shared';

@Component({
  selector: 'ft-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userId: number;
  userExercises: Exercise[] = [];
  userFitnessPlan: FitnessPlan = null;

  constructor(private authSvc: AuthService, private coreApiSvc: CoreApiService) { }

  ngOnInit() {
    this.userId = this.authSvc.userId;
    this.getExercises();
    this.getFitnessPlan();
  }

  getExercises() {
    let pastMonth = moment().subtract(30, 'days').toISOString();
    this.coreApiSvc.get(`/users/${this.userId}/exercises?include=score,duration,exerciseType&filters=endTime__isnull=false|start_time__gte=${pastMonth}`).subscribe((result) => {
      this.userExercises = result;
    });
  }

  getFitnessPlan() {
    this.coreApiSvc.get(`/users/${this.userId}/fitnessPlans`).subscribe((result) => {
      if (result.length > 0) {
        this.userFitnessPlan = result[0];
      } else {
        this.userFitnessPlan = null;
      }
    });
  }

}
