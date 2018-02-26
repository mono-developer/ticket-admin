import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'ms-view-sale-users',
  templateUrl: './view-sale-users.component.html',
  styleUrls: ['./view-sale-users.component.scss']
})
export class ViewSaleUsersComponent implements OnInit {
  page_title: string = 'Management of sales teams';

  displayedColumns = ['first_name', 'email', 'phone', 'state', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor() { }

  ngOnInit() {
  }
}
export interface Element {
  first_name: string;
  email: string;
  phone: string;
  state: string;
  symbol: string;
}

const ELEMENT_DATA: Element[] = [
  { first_name: 'Minoru', email: 'minorumadamr@hotmail.com', phone: '123456789', state: 'Activate', symbol: ''},
  { first_name: 'Daniel', email: 'Daniel@alphavictoria.com', phone: '987654321', state: 'Activate', symbol: ''},
  { first_name: 'Chan', email: 'chan_handevok@hotmail.com', phone: '4567945422', state: 'Activate', symbol: ''},
  { first_name: 'Andres', email: 'andres@sample.com', phone: '1026146408', state: 'Activate',symbol: ''},
];
