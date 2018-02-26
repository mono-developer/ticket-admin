import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBullentinComponent } from './view-bullentin.component';

describe('ViewBullentinComponent', () => {
  let component: ViewBullentinComponent;
  let fixture: ComponentFixture<ViewBullentinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBullentinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBullentinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
