/* tslint:disable:no-unused-variable */
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';

import { CoreApiService } from '../../../shared/core-api';
import { CoreApiServiceStub } from '../../../shared/test-stubs';
import { AuthService } from '../../auth';
import { SharedModule } from '../../shared.module';

import { User } from '../../models';

import { MainLayoutComponent } from './main-layout.component';


let component: MainLayoutComponent;
let fixture: ComponentFixture<MainLayoutComponent>;

describe('MainLayoutComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
      ],
      declarations: [],
      providers: [
        { provide: AuthService, useValue: {logout: () => {}} },
        { provide: Router, useValue: {url: '/advertising/adsense', navigate: () => {}, navigateByUrl: () => {}} },
        { provide: CoreApiService, useValue: CoreApiServiceStub },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call CoreApiService on getUserData', inject([CoreApiService], (coreApiSvc: CoreApiService) => {
    // Arrange
    let spy = spyOn(coreApiSvc, 'get').and.returnValue(Observable.from([ new User() ]));
    // Act
    component.getUserData();
    // Assert
    expect(spy).toHaveBeenCalled();
    expect(component.user).toEqual(new User());
  }));

  it('should call Router on onNavSelect', inject([Router], (router: Router) => {
    // Arrange
    let path = '/profile';
    let spy = spyOn(router, 'navigate');
    // Act
    component.onNavSelect(path);
    // Assert
    expect(spy).toHaveBeenCalled();
    expect(component.selectedRoute).toEqual(path);
  }));

  it('should call Router on onSelectTab', inject([Router], (router: Router) => {
    // Arrange
    let path = '/sub-header';
    let spy = spyOn(router, 'navigateByUrl');
    // Act
    component.onSelectTab(path);
    // Assert
    expect(spy).toHaveBeenCalled();
    expect(component.activeSubHeader).toEqual(path);
  }));

  it('should call Router & AuthService on onLogout', inject([AuthService, Router], (authSvc: AuthService, router: Router) => {
    // Arrange
    let spy1 = spyOn(authSvc, 'logout');
    let spy2 = spyOn(router, 'navigateByUrl');
    // Act
    component.onLogout();
    // Assert
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  }));

});