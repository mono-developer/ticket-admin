import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrganizorComponent } from './add-organizor.component';

describe('AddOrganizorComponent', () => {
  let component: AddOrganizorComponent;
  let fixture: ComponentFixture<AddOrganizorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddOrganizorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrganizorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
