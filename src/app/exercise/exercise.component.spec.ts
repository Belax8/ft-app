/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs';

import { CoreApiService, AuthService, Exercise } from '../shared';
import { AuthServiceStub, CoreApiServiceStub } from '../shared/test-stubs';

import { ExerciseModule } from './exercise.module';
import { ExerciseComponent } from './exercise.component';

let component: ExerciseComponent;
let fixture: ComponentFixture<ExerciseComponent>;

describe('ExerciseComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ExerciseModule
      ],
      declarations: [
      ],
      providers: [
        { provide: CoreApiService, useValue: CoreApiServiceStub },
        { provide: AuthService, useValue: AuthServiceStub }
      ]
    });
    fixture = TestBed.createComponent(ExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getExercises on ngOnInit', () => {
    // Arrange
    let spy = spyOn(component, 'getExercises');
    // Act
    component.ngOnInit();
    // Assert
    expect(spy).toHaveBeenCalled();
  });

  it('should call coreApiSvc.get on getExercises', inject([CoreApiService], (coreApiSvc: CoreApiService) => {
    // Arrange
    let returnedValue = [
      { id: 1, startTime: '2018-02-28T17:20:13.131Z', endTime: '2018-02-28T17:47:13.131Z' },
      { id: 2, startTime: '2018-02-28T17:54:13.131Z', endTime: '2018-02-28T18:20:13.131Z' },
      { id: 3, startTime: '2018-02-28T18:56:13.131Z', endTime: null }
    ];
    let spy = spyOn(coreApiSvc, 'get').and.returnValue(Observable.from([ returnedValue ]));
    // Act
    component.getExercises();
    // Assert
    expect(spy).toHaveBeenCalled();
    expect(component.allExercises.length).toEqual(3);
    expect(component.completedExercises.length).toEqual(2);
    expect(component.incompleteExercises.length).toEqual(1);
  }));

  it('should call coreApiSvc.put on endExercise', inject([CoreApiService], (coreApiSvc: CoreApiService) => {
    // Arrange
    let exerciseId = 20;
    let coreSpy = spyOn(coreApiSvc, 'put').and.returnValue(Observable.from([ {id: 20} ]));
    let getExercisesSpy = spyOn(component, 'getExercises');
    // Act
    component.endExercise(exerciseId);
    // Assert
    expect(coreSpy).toHaveBeenCalled();
    expect(getExercisesSpy).toHaveBeenCalled();
  }));

  it('should select the exercise and open the modal on openModal', () => {
    // Arrange
    component.showEditModal = false;
    component.selectedExercise = null;
    let exerciseOne = new Exercise();
    exerciseOne.id = 1;
    let exerciseTwo = new Exercise();
    exerciseOne.id = 2;
    component.allExercises = [ exerciseOne, exerciseTwo ];
    let exerciseId = 2;
    // Act
    component.openModal(exerciseId);
    // Assert
    expect(component.selectedExercise.id).toEqual(exerciseId);
    expect(component.showEditModal).toEqual(true);
  });

  it('should create a new Exercise and open the modal on manualEditModal', () => {
    // Arrange
    component.selectedExercise = null;
    component.showEditModal = false;
    // Act
    component.manualEditModal();
    // Assert
    expect(component.selectedExercise.id).toEqual(0);
    expect(component.showEditModal).toEqual(true);
  });

  it('should reset data on onModalClose', () => {
    // Arrange
    component.showEditModal = true;
    component.showStartModal = true;
    let spy = spyOn(component, 'getExercises');
    // Act
    component.onModalClose();
    // Assert
    expect(component.showEditModal).toEqual(false);
    expect(component.showStartModal).toEqual(false);
    expect(spy).toHaveBeenCalled();
  });

});
