import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingDialogComponent } from './book-dialog.component';

describe('BookingDialogComponent', () => {
  let component: BookingDialogComponent;
  let fixture: ComponentFixture<BookingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
