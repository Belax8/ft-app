/* tslint:disable:no-unused-variable */
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../shared';

import { RouterStub, RouterLinkStubDirective } from '../shared/test-stubs';

import { LoginModule } from './login.module';
import { LoginComponent } from './login.component';

let component: LoginComponent;
let fixture: ComponentFixture<LoginComponent>;

describe('LoginComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      declarations: [
        LoginComponent,
        RouterLinkStubDirective
      ],
      providers: [
        { provide: AuthService, useValue: {login: () => { return Observable.from([]); }} },
        { provide: Router, useClass: RouterStub },
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call AuthService on onSubmit', inject([AuthService], (authSvc: AuthService) => {
    // Arrange
    let spy = spyOn(authSvc, 'login').and.callThrough();
    // Act
    component.onSubmit();
    // Assert
    expect(spy).toHaveBeenCalled();
  }));

  it('should set call Router on onSubmit if success', inject([AuthService, Router], (authSvc: AuthService, router: Router) => {
    // Arrange
    spyOn(authSvc, 'login').and.returnValue(Observable.from([{status: 'success'}]));
    let spy = spyOn(router, 'navigateByUrl');
    // Act
    component.onSubmit();
    // Assert
    expect(spy).toHaveBeenCalled();
  }));

  it('should set errorMessage on onSubmit if failed', inject([AuthService], (authSvc: AuthService) => {
    // Arrange
    component.errorMessage = null;
    spyOn(authSvc, 'login').and.returnValue(Observable.throw([ {id: 1} ]));
    // Act
    component.onSubmit();
    // Assert
    expect(component.errorMessage).not.toEqual(null);
  }));

});