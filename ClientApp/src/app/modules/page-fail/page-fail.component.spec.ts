/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageFailComponent } from './page-fail.component';

describe('PageFailComponent', () => {
  let component: PageFailComponent;
  let fixture: ComponentFixture<PageFailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageFailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageFailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
