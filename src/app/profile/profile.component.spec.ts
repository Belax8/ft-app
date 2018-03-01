/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs';

import { CoreApiService, AuthService, User, FitnessPlan, FitnessPlanType } from '../shared';
import { AuthServiceStub, CoreApiServiceStub } from '../shared/test-stubs';

import { ProfileModule } from './profile.module';
import { ProfileComponent } from './profile.component';

let component: ProfileComponent;
let fixture: ComponentFixture<ProfileComponent>;

describe('ProfileComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ProfileModule
      ],
      declarations: [
      ],
      providers: [
        { provide: CoreApiService, useValue: CoreApiServiceStub },
        { provide: AuthService, useValue: AuthServiceStub }
      ]
    });
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all your data on ngOnInit', () => {
    // Arrange
    let getFitnessPlanSpy = spyOn(component, 'getFitnessPlan');
    let getUserInfoSpy = spyOn(component, 'getUserInfo');
    let getFitnessPlanTypesSpy = spyOn(component, 'getFitnessPlanTypes');
    // Act
    component.ngOnInit();
    // Assert
    expect(getFitnessPlanSpy).toHaveBeenCalled();
    expect(getUserInfoSpy).toHaveBeenCalled();
    expect(getFitnessPlanTypesSpy).toHaveBeenCalled();
  });

  it('should get user info and check if weight is set on getUserInfo - weight set', inject([CoreApiService], (coreApiSvc: CoreApiService) => {
    // Arrange
    let spy = spyOn(coreApiSvc, 'get').and.returnValue(Observable.from([ {id: 10, weight: 160 } ]));
    // Act
    component.getUserInfo();
    // Assert
    expect(spy).toHaveBeenCalled();
    expect(component.editUser).toEqual(false);
  }));

  it('should get user info and check if weight is set on getUserInfo - weight NOT set', inject([CoreApiService], (coreApiSvc: CoreApiService) => {
    // Arrange
    let spy = spyOn(coreApiSvc, 'get').and.returnValue(Observable.from([ {id: 10, weight: null } ]));
    // Act
    component.getUserInfo();
    // Assert
    expect(spy).toHaveBeenCalled();
    expect(component.editUser).toEqual(true);
  }));

  //TODO: getFitnessPlan
  it('should set editGoals to true on error on getFitnessPlan', inject([CoreApiService], (coreApiSvc: CoreApiService) => {
    // Arrange
    let spy = spyOn(coreApiSvc, 'get').and.returnValue(Observable.throw([ {error: 'Error'} ]));
    // Act
    component.getFitnessPlan();
    // Assert
    expect(component.editGoals).toEqual(true);
  }));

  it('should set editGoals to true if the GET returns an empty array on getFitnessPlan', inject([CoreApiService], (coreApiSvc: CoreApiService) => {
    // Arrange
    let spy = spyOn(coreApiSvc, 'get').and.returnValue(Observable.from([ [] ]));
    // Act
    component.getFitnessPlan();
    // Assert
    expect(component.editGoals).toEqual(true);
  }));

  it('should set userFitnessPlan if the GET returns a result on getFitnessPlan', inject([CoreApiService], (coreApiSvc: CoreApiService) => {
    // Arrange
    component.userFitnessPlan = null;
    let spy = spyOn(coreApiSvc, 'get').and.returnValue(Observable.from([ [{id: 10}] ]));
    // Act
    component.getFitnessPlan();
    // Assert
    expect(component.userFitnessPlan).toBeTruthy();
  }));







  it('should get fitness plan types on getFitnessPlanTypes', inject([CoreApiService], (coreApiSvc: CoreApiService) => {
    // Arrange
    let spy = spyOn(coreApiSvc, 'get').and.returnValue(Observable.from([ [{id: 20}] ]));
    // Act
    component.getFitnessPlanTypes();
    // Assert
    expect(spy).toHaveBeenCalled();
    expect(component.fitnessPlanTypes.length).toEqual(1);
  }));

  it('should call coreApiSvc.put on saveNewWeight', inject([CoreApiService], (coreApiSvc: CoreApiService) => {
    // Arrange
    component.userId = 20;
    component.user = new User();
    component.user.id = 20;
    component.user.weight = 155;
    let spy = spyOn(coreApiSvc, 'put').and.returnValue(Observable.from([ {id: 20} ]));
    // Act
    component.saveNewWeight();
    // Assert
    expect(spy).toHaveBeenCalled();
    expect(component.editUser).toEqual(false);
  }));

  it('should call coreApiSvc.post on updateGoals if its a new goal', inject([CoreApiService], (coreApiSvc: CoreApiService) => {
    // Arrange
    component.userId = 10;
    let fitnessPlanType = new FitnessPlanType();
    component.userFitnessPlan = new FitnessPlan();
    component.userFitnessPlan.fitnessPlanType = fitnessPlanType;
    let coreApiSvcSpy = spyOn(coreApiSvc, 'post').and.returnValue(Observable.from([ {id: 11} ]));
    let getFitnessPlanSpy = spyOn(component, 'getFitnessPlan');
    // Act
    component.updateGoals();
    // Assert
    expect(coreApiSvcSpy).toHaveBeenCalled();
    expect(getFitnessPlanSpy).toHaveBeenCalled();
    expect(component.editGoals).toEqual(false);
  }));

  it('should call coreApiSvc.put on updateGoals if they have a goal', inject([CoreApiService], (coreApiSvc: CoreApiService) => {
    // Arrange
    component.userId = 10;
    let fitnessPlanType = new FitnessPlanType();
    component.userFitnessPlan = new FitnessPlan();
    component.userFitnessPlan.id = 10;
    component.userFitnessPlan.fitnessPlanType = fitnessPlanType;
    let coreApiSvcSpy = spyOn(coreApiSvc, 'put').and.returnValue(Observable.from([ {id: 10} ]));
    let getFitnessPlanSpy = spyOn(component, 'getFitnessPlan');
    // Act
    component.updateGoals();
    // Assert
    expect(coreApiSvcSpy).toHaveBeenCalled();
    expect(getFitnessPlanSpy).toHaveBeenCalled();
    expect(component.editGoals).toEqual(false);
  }));

  it('should request more info if you are missing info on getCalculations', () => {
    // Arrange
    // Act
    let result = component.getCalculations();
    // Assert
    expect(result).toEqual('Please enter all data.');
  });

  it('should say congrats if you acheived your goal on getCalculations', () => {
    // Arrange
    component.user = new User();
    component.user.weight = 155;
    let fitnessPlanType = new FitnessPlanType();
    fitnessPlanType.poundsPerWeek = 1;
    component.userFitnessPlan = new FitnessPlan();
    component.userFitnessPlan.goalWeight = 160;
    component.userFitnessPlan.fitnessPlanType = fitnessPlanType;
    // Act
    let result = component.getCalculations();
    // Assert
    expect(result).toEqual('You have acheived your goal!!');
  });

  it('should tell you the amount of weeks left if you havent hit your goal on getCalculations', () => {
    // Arrange
    component.user = new User();
    component.user.weight = 160;
    let fitnessPlanType = new FitnessPlanType();
    fitnessPlanType.poundsPerWeek = 1;
    component.userFitnessPlan = new FitnessPlan();
    component.userFitnessPlan.goalWeight = 150;
    component.userFitnessPlan.fitnessPlanType = fitnessPlanType;
    // Act
    let result = component.getCalculations();
    // Assert
    expect(result).toEqual('Based on your current weight and goals, it will take you about 10 weeks to acheive your goal.');
  });

});
