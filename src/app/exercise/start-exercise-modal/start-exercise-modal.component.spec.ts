/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StartExerciseModalComponent } from './start-exercise-modal.component';

describe('StartExerciseModalComponent', () => {
  let component: StartExerciseModalComponent;
  let fixture: ComponentFixture<StartExerciseModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartExerciseModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartExerciseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
