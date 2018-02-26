import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'ms-view-coupon',
  templateUrl: './view-coupon.component.html',
  styleUrls: ['./view-coupon.component.scss']
})
export class ViewCouponComponent implements OnInit {

  page_title: string = 'Management of sales teams';

  displayedColumns = ['code', 'description', 'discount', 'state', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  constructor() { }

  ngOnInit() {
  }

}

export interface Element {
  code: string;
  description: string;
  discount: string;
  state: string;
  symbol: string;
}

const ELEMENT_DATA: Element[] = [
  { code: 'SAVE100', description: 'New year Offer', discount: '10', state: 'Active', symbol: ''},
  { code: 'SAVE10', description: 'NEW YEAR OFFER', discount: '12', state: 'Active', symbol: ''},
];
