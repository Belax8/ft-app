/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs';

import { CoreApiService, AuthService, Exercise } from '../../shared';
import { AuthServiceStub, CoreApiServiceStub } from '../../shared/test-stubs';

import { ExerciseModule } from '../exercise.module';
import { ExerciseModalComponent } from './exercise-modal.component';

let component: ExerciseModalComponent;
let fixture: ComponentFixture<ExerciseModalComponent>;

describe('ExerciseModalComponent', () => {

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
    fixture = TestBed.createComponent(ExerciseModalComponent);
    component = fixture.componentInstance;
    component.exercise = new Exercise();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getExerciseTypes on ngOnInit', () => {
    // Arrange
    let spy = spyOn(component, 'getExerciseTypes');
    // Act
    component.ngOnInit();
    // Assert
    expect(spy).toHaveBeenCalled();
  });

  it('should call CoreApiSvc.get on getExerciseTypes', inject([CoreApiService], (coreApiSvc: CoreApiService) => {
    // Arrange
    let spy = spyOn(coreApiSvc, 'get').and.returnValue(Observable.from([ [{id: 10}] ]));
    // Act
    component.getExerciseTypes();
    // Assert
    expect(spy).toHaveBeenCalled();
    expect(component.exerciseTypes.length).toEqual(1);
  }));

  it('should call hidden.emit on onHidden', () => {
    // Arrange
    let spy = spyOn(component.hidden, 'emit');
    // Act
    component.onHidden();
    // Assert
    expect(spy).toHaveBeenCalled();
  });

  it('should call ftModalComponent.hide on onClose', () => {
    // Arrange
    let spy = spyOn(component.ftModalComponent, 'hide');
    // Act
    component.onClose();
    // Assert
    expect(spy).toHaveBeenCalled();
  });

  it('should call coreApiSvc.post on onSave if the exercise is new', inject([CoreApiService], (coreApiSvc: CoreApiService) => {
    // Arrange
    component.exercise = new Exercise();
    let coreApiSvcSpy = spyOn(coreApiSvc, 'post').and.returnValue(Observable.from([ {id: 10} ]));
    let onCloseSpy = spyOn(component, 'onClose');
    // Act
    component.onSave();
    // Assert
    expect(coreApiSvcSpy).toHaveBeenCalled();
    expect(onCloseSpy).toHaveBeenCalled();
  }));

  it('should call coreApiSvc.put on onSave if the exercise is NOT new', inject([CoreApiService], (coreApiSvc: CoreApiService) => {
    // Arrange
    component.exercise = new Exercise();
    component.exercise.id = 20;
    let coreApiSvcSpy = spyOn(coreApiSvc, 'put').and.returnValue(Observable.from([ {id: 10} ]));
    let onCloseSpy = spyOn(component, 'onClose');
    // Act
    component.onSave();
    // Assert
    expect(coreApiSvcSpy).toHaveBeenCalled();
    expect(onCloseSpy).toHaveBeenCalled();
  }));

});
