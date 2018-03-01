/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SharedModule } from '../../shared.module';

import { FooterLayoutComponent } from './footer-layout.component';

let component: FooterLayoutComponent;
let fixture: ComponentFixture<FooterLayoutComponent>;

describe('FooterLayoutComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [
      ],
      providers: [
      ]
    });
    fixture = TestBed.createComponent(FooterLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
