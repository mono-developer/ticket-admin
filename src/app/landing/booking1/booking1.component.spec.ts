import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Booking1Component } from './booking1.component';

describe('DateReportsComponent', () => {
  let component: Booking1Component;
  let fixture: ComponentFixture<Booking1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Booking1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Booking1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
