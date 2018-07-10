import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StageMapComponent } from './stage-map.component';

describe('StageMapComponent', () => {
  let component: StageMapComponent;
  let fixture: ComponentFixture<StageMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StageMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
