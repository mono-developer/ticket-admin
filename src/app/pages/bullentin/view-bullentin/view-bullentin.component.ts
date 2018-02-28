import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { Router } from '@angular/router';
import { json } from 'd3';

@Component({
  selector: 'ms-view-bullentin',
  templateUrl: './view-bullentin.component.html',
  styleUrls: ['./view-bullentin.component.scss']
})
export class ViewBullentinComponent implements OnInit {
  page_title: string = 'View Newsletter';

  displayedColumns = ['title', 'description', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  edit(item: any) {
    console.log("senddata",item);
    this.router.navigate(['bullentin/add-bullentin', { item: item.id }]);

  }
  delete(item) {
    console.log(item);
  }

}

export interface Element {
  id: number;
  title: string;
  description: string;
  symbol: string;
}

const ELEMENT_DATA: Element[] = [
  { id: 1, title: 'Test', description: 'Testing for the newsletter', symbol: '0'},
  { id: 2, title: 'TESTING NEWSLETTER IN FEB', description: 'testing', symbol: '1'},
  { id: 3, title: 'Main Headlines', description: 'We are testing now for newsletter', symbol: '2'},
  { id: 4, title: 'Proof', description: 'I need to test this', symbol: '3'},
];
