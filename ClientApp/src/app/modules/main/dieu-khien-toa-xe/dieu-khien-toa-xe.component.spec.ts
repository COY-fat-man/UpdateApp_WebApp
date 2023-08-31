/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DieuKhienToaXeComponent } from './dieu-khien-toa-xe.component';

describe('DieuKhienToaXeComponent', () => {
  let component: DieuKhienToaXeComponent;
  let fixture: ComponentFixture<DieuKhienToaXeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DieuKhienToaXeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DieuKhienToaXeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
