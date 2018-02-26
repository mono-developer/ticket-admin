import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSaleUsersComponent } from './add-sale-users.component';

describe('AddSaleUsersComponent', () => {
  let component: AddSaleUsersComponent;
  let fixture: ComponentFixture<AddSaleUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSaleUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSaleUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
