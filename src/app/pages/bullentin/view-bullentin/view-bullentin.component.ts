import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'ms-view-bullentin',
  templateUrl: './view-bullentin.component.html',
  styleUrls: ['./view-bullentin.component.scss']
})
export class ViewBullentinComponent implements OnInit {
  page_title: string = 'View Newsletter';

  displayedColumns = ['title', 'description', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  constructor() { }

  ngOnInit() {
  }

}

export interface Element {
  title: string;
  description: string;
  symbol: string;
}

const ELEMENT_DATA: Element[] = [
  { title: 'Test', description: 'Testing for the newsletter', symbol: ''},
  { title: 'TESTING NEWSLETTER IN FEB', description: 'testing', symbol: ''},
  { title: 'Main Headlines', description: 'We are testing now for newsletter', symbol: ''},
  { title: 'Proof', description: 'I need to test this', symbol: ''},
];
