import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCMSComponent } from './view-cms.component';

describe('ViewCMSComponent', () => {
  let component: ViewCMSComponent;
  let fixture: ComponentFixture<ViewCMSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCMSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCMSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
