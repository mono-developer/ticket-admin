import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerImagesComponent } from './banner-images.component';

describe('BannerImagesComponent', () => {
  let component: BannerImagesComponent;
  let fixture: ComponentFixture<BannerImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
