/* tslint:disable:no-unused-variable */
import { By } from '@angular/platform-browser';
import { DebugElement, Directive, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  async, inject, TestBed, ComponentFixture
} from '@angular/core/testing';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { SharedModule } from '../shared.module';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

let guard: AuthGuard;

describe('AuthGuard', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: {isAuthenticated: () => { return true; }} },
        { provide: Router, useValue: {navigateByUrl: () => { return true; }} }
      ]
    });

    guard = TestBed.get(AuthGuard, null);
  });

  it('should create an instance', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true on canActivate', inject([AuthService], (authSvc: AuthService) => {
    // Arrange
    spyOn(authSvc, 'isAuthenticated').and.returnValue(true);
    // Act
    let result = guard.canActivate();
    // Assert
    expect(result).toBeTruthy();
  }));

  it('should return false on canActivate', inject([AuthService, Router], (authSvc: AuthService, router: Router) => {
    // Arrange
    spyOn(authSvc, 'isAuthenticated').and.returnValue(false);
    let spy = spyOn(router, 'navigateByUrl');
    // Act
    let result = guard.canActivate();
    // Assert
    expect(result).toBeFalsy();
    expect(spy).toHaveBeenCalled();
  }));

});