import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'ms-banner-images',
  templateUrl: './banner-images.component.html',
  styleUrls: ['./banner-images.component.scss']
})
export class BannerImagesComponent implements OnInit {
  page_title: string = 'Banner Images';

  displayedColumns = ['section', 'image', 'button'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  constructor() { }

  ngOnInit() {
  }

}
export interface Element {
  section: string;
  image: string;
  button: string;
}

const ELEMENT_DATA: Element[] = [
  { section: 'Banner image upper right', image: 'assets/img/backgrounds/banner1.jpg', button: 'Add image of the top right banner'},
  { section: 'Image of left bottom banner', image: 'assets/img/backgrounds/banner2.jpg', button: 'Add banner Image Left Below'},
  { section: 'Banner image of the bottom right', image: 'assets/img/backgrounds/banner3.jpg', button: 'Add Banner Image from Bottom Right'},
];
