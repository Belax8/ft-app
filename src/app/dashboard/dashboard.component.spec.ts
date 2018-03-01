/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

import { CoreApiService, AuthService } from '../shared';
import { AuthServiceStub, CoreApiServiceStub } from '../shared/test-stubs';

import { DashboardModule } from './dashboard.module';
import { DashboardComponent } from './dashboard.component';

let component: DashboardComponent;
let fixture: ComponentFixture<DashboardComponent>;

describe('DashboardComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DashboardModule
      ],
      declarations: [
      ],
      providers: [
        { provide: CoreApiService, useValue: CoreApiServiceStub },
        { provide: AuthService, useValue: AuthServiceStub }
      ]
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should try to get all the info on ngOnInit', () => {
    // Arrange
    let getExercisesSpy = spyOn(component, 'getExercises');
    let getFitnessPlanSpy = spyOn(component, 'getFitnessPlan');
    // Act
    component.ngOnInit();
    // Assert
    expect(getExercisesSpy).toHaveBeenCalled();
    expect(getFitnessPlanSpy).toHaveBeenCalled();
  });

  it('should GET exercises from CoreApiSvc on getExercises', inject([CoreApiService], (coreApiSvc: CoreApiService) => {
    // Arrange
    component.userExercises = [];
    let spy = spyOn(coreApiSvc, 'get').and.returnValue(Observable.from([ [{id:10}] ]));
    // Act
    component.getExercises();
    // Assert
    expect(spy).toHaveBeenCalled();
    expect(component.userExercises.length).toEqual(1);
  }));

  it('should GET fitness plan from CoreApiSvc on getFitnessPlan - they have a plan', inject([CoreApiService], (coreApiSvc: CoreApiService) => {
    // Arrange
    component.userFitnessPlan = null;
    let spy = spyOn(coreApiSvc, 'get').and.returnValue(Observable.from([ [{id:10}] ]));
    // Act
    component.getFitnessPlan();
    // Assert
    expect(spy).toHaveBeenCalled();
    expect(component.userFitnessPlan).toBeTruthy();
  }));

  it('should GET fitness plan from CoreApiSvc on getFitnessPlan - they DONT have a plan', inject([CoreApiService], (coreApiSvc: CoreApiService) => {
    // Arrange
    component.userFitnessPlan = null;
    let spy = spyOn(coreApiSvc, 'get').and.returnValue(Observable.from([ [] ]));
    // Act
    component.getFitnessPlan();
    // Assert
    expect(spy).toHaveBeenCalled();
    expect(component.userFitnessPlan).toEqual(null);
  }));

});
