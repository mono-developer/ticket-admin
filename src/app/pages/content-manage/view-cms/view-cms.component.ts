import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'ms-view-cms',
  templateUrl: './view-cms.component.html',
  styleUrls: ['./view-cms.component.scss']
})
export class ViewCMSComponent implements OnInit {

  page_title: string = 'View Pages';

  displayedColumns = ['title', 'description', 'state', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  constructor() { }

  ngOnInit() {
  }
}

export interface Element {
  title: string;
  description: string;
  state: string;
  symbol: string;
}

const ELEMENT_DATA: Element[] = [
  {title: 'Press Notices', description: 'A page to do the tsting, A page to do the tsting, A page to do the tsting', state: 'Active', symbol: 'H'},
  {title: 'Hello', description: 'Helium', state: 'Active', symbol: 'He'},
  {title: 'No mouth', description: 'Lithium', state: 'Active', symbol: 'Li'},

];
