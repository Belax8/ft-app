/* tslint:disable:no-unused-variable */
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';

import { SharedModule } from '../../shared.module';

import { LoginLayoutComponent } from './login-layout.component';

let component: LoginLayoutComponent;
let fixture: ComponentFixture<LoginLayoutComponent>;

describe('LoginLayoutComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule
      ],
      declarations: [
      ],
      providers: [
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    });
    fixture = TestBed.createComponent(LoginLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
