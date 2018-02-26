import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBullentinComponent } from './add-bullentin.component';

describe('AddBullentinComponent', () => {
  let component: AddBullentinComponent;
  let fixture: ComponentFixture<AddBullentinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBullentinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBullentinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
