import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateReportsComponent } from './date-reports.component';

describe('DateReportsComponent', () => {
  let component: DateReportsComponent;
  let fixture: ComponentFixture<DateReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
