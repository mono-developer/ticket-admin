import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'ms-view-organization',
  templateUrl: './view-organization.component.html',
  styleUrls: ['./view-organization.component.scss']
})
export class ViewOrganizationComponent implements OnInit {

  page_title: string = 'View Organization';

  displayedColumns = ['name', 'person', 'email', 'phone', 'state', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  constructor() { }

  ngOnInit() {
  }

}

export interface Element {
  name: string;
  person: string;
  email: string;
  phone: string;
  state: string;
  symbol: string;
}

const ELEMENT_DATA: Element[] = [
  { name: 'Minoru', person: 'Kobayashi', email: 'minorumadamr@hotmail.com', phone: '123456789', state: 'Active', symbol: ''},
  { name: 'Daniel', person: 'Garrido', email: 'Daniel@alphavictoria.com', phone: '987654321', state: 'Active', symbol: ''},
  { name: 'Chan', person: 'Han', email: 'chan_handevok@hotmail.com', phone: '4567945422', state: 'Active', symbol: ''},
  { name: 'Andres', person: 'Garcia', email: 'andres@sample.com', phone: '1026146408', state: 'Active',symbol: ''},
];
