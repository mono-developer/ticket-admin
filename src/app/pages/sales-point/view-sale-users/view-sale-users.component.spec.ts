import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSaleUsersComponent } from './view-sale-users.component';

describe('ViewSaleUsersComponent', () => {
  let component: ViewSaleUsersComponent;
  let fixture: ComponentFixture<ViewSaleUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSaleUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSaleUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
