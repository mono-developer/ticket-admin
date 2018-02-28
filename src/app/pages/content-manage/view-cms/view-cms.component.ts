import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { Router } from '@angular/router';
import { json } from 'd3';

@Component({
  selector: 'ms-view-cms',
  templateUrl: './view-cms.component.html',
  styleUrls: ['./view-cms.component.scss']
})
export class ViewCMSComponent implements OnInit {

  page_title: string = 'View Pages';

  displayedColumns = ['title', 'description', 'state', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  edit(item: any) {
    console.log("senddata", item);
    this.router.navigate(['content-manage/add-cms', { item: item.id }]);

  }
  delete(item) {
    console.log(item);
  }

  newCMS() {

  }
  goSubpage(item) {
    console.log(item);
  }

}

export interface Element {
  id: number;
  title: string;
  description: string;
  state: string;
  symbol: string;
}

const ELEMENT_DATA: Element[] = [
  { id: 1, title: 'Press Notices', description: 'A page to do the tsting, A page to do the tsting, A page to do the tsting', state: 'Active', symbol: 'H'},
  { id: 2, title: 'Hello', description: 'Helium', state: 'Active', symbol: 'He'},
  { id: 3, title: 'No mouth', description: 'Lithium', state: 'Active', symbol: 'Li'},

];
