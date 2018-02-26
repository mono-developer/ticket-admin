import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'ms-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.scss']
})
export class ViewCategoryComponent implements OnInit {
  page_title: string = 'Event Categories';

  displayedColumns = ['category', 'state', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor() { }

  ngOnInit() {
  }

}

export interface Element {
  category: string;
  state: string;
  symbol: string;
}

const ELEMENT_DATA: Element[] = [
  {category: 'Music', state: 'Active', symbol: ''},
  {category: 'Sports', state: 'Active', symbol: ''},
  {category: 'Theater', state: 'Active', symbol: ''},
  {category: 'Concert', state: 'Active', symbol: ''},
  {category: 'Family', state: 'Active', symbol: ''},
  {category: 'Others', state: 'Active', symbol: ''},


];

