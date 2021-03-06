import { Component, OnInit } from '@angular/core';

import { AuthService, CoreApiService, FitnessPlan, FitnessPlanType, User } from '../shared';

@Component({
  selector: 'ft-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userId: number;
  user: User = new User();
  userFitnessPlan: FitnessPlan = new FitnessPlan();
  fitnessPlanTypes: FitnessPlanType[] = [];

  editUser: boolean = false;
  editGoals: boolean = false;

  constructor(private authSvc: AuthService, private coreApiSvc: CoreApiService) { }

  ngOnInit(): void {
    this.userId = this.authSvc.userId;
    this.getFitnessPlan();
    this.getUserInfo();
    this.getFitnessPlanTypes();
  }

  getUserInfo(): void {
    this.coreApiSvc.get(`/users/${this.userId}`).subscribe((result) => {
      this.user = result;
      if (this.user.weight === null) {
        this.editUser = true;
      }
    });
  }

  getFitnessPlan(): void {
    this.coreApiSvc.get(`/users/${this.userId}/fitnessPlans?include=fitnessPlanType`).subscribe(
      (result) => {
        if (result.length > 0) {
          this.userFitnessPlan = result[0];
        } else {
          this.editGoals = true;
        }
      },
      (error) => {
        this.editGoals = true;
      }
    );
  }

  getFitnessPlanTypes(): void {
    this.coreApiSvc.get('/fitnessPlanTypes').subscribe((result) => {
      this.fitnessPlanTypes = result;
    });
  }

  saveNewWeight() {
    this.coreApiSvc.put(`/users/${this.userId}`, {weight: this.user.weight}).subscribe((result) => {
      this.user.weight = result.weight;
      this.editUser = false;
    });
  }

  updateGoals() {
    if (this.userFitnessPlan.id === 0) {
      let body = {
        userId: this.userId,
        fitnessPlanTypeId: this.userFitnessPlan.fitnessPlanTypeId,
        goalWeight: this.userFitnessPlan.goalWeight
      };
      this.coreApiSvc.post(`/fitnessPlans`, body).subscribe((result) => {
        this.editGoals = false;
        this.getFitnessPlan();
      });
    } else {
      let body = {
        fitnessPlanTypeId: this.userFitnessPlan.fitnessPlanTypeId,
        goalWeight: this.userFitnessPlan.goalWeight
      };
      this.coreApiSvc.put(`/fitnessPlans/${this.userFitnessPlan.id}`, body).subscribe((result) => {
        this.editGoals = false;
        this.getFitnessPlan();
      });
    }
  }

  getCalculations(): string {
    if (this.user && this.user.weight && this.userFitnessPlan && this.userFitnessPlan.fitnessPlanType) {
      let amountOfWeeks = 0;
      let currentWeight = this.user.weight;
      let goalWeight = this.userFitnessPlan.goalWeight;
      let poundsPerWeek = this.userFitnessPlan.fitnessPlanType.poundsPerWeek;

      if (currentWeight <= goalWeight) {
        return 'You have acheived your goal!!';
      } else {
        while (goalWeight < currentWeight) {
          amountOfWeeks += 1;
          currentWeight -= poundsPerWeek;
        }
        return `Based on your current weight and goals, it will take you about ${amountOfWeeks} weeks to acheive your goal.`;  
      }
    }
    return 'Please enter all data.';
  }

}
