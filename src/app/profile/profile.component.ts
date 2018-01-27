import { Component, OnInit } from '@angular/core';

import { AuthService, CoreApiService, Exercise, FitnessPlan} from '../shared';

@Component({
  selector: 'ft-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userId: number;
  userFitnessPlan: FitnessPlan = null;

  constructor(private authSvc: AuthService, private coreApiSvc: CoreApiService) { }

  ngOnInit() {
    this.userId = this.authSvc.userId;
    this.getFitnessPlan();
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
