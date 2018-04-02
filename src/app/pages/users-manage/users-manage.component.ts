import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'ms-users-manage',
  templateUrl: './users-manage.component.html',
  styleUrls: ['./users-manage.component.scss']
})
export class UsersManageComponent implements OnInit {

  page_title: string = 'Management of sales teams';

  displayedColumns = ['first_name', 'email', 'status', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor() { }

  ngOnInit() {
  }

}

export interface Element {
  first_name: string;
  email: string;
  status: string;
  symbol: string;
}

const ELEMENT_DATA: Element[] = [
  { first_name: 'Minoru', email: 'minorumadamr@hotmail.com', status: 'Activate',  symbol: ''},
  { first_name: 'Daniel', email: 'Daniel@alphavictoria.com', status: 'Activate', symbol: ''},
  { first_name: 'Chan', email: 'chan_handevok@hotmail.com', status: 'Activate', symbol: ''},
  { first_name: 'Andres', email: 'andres@sample.com', status: 'Activate', symbol: ''},
];
