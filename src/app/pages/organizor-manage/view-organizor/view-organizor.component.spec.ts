import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrganizorComponent } from './view-organizor.component';

describe('ViewOrganizorComponent', () => {
  let component: ViewOrganizorComponent;
  let fixture: ComponentFixture<ViewOrganizorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewOrganizorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOrganizorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
