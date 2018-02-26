import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'ms-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.scss']
})
export class ViewEventComponent implements OnInit {

  page_title: string = 'Event Management';

  displayedColumns = ['category', 'name', 'place', 'state', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  constructor() { }

  ngOnInit() {
  }
}

export interface Element {
  category: string;
  name: string;
  place: string;
  state: string;
  symbol: string;
}

const ELEMENT_DATA: Element[] = [
  {category: 'Music', name: 'SILVESTRE DANGOND', place: 'El Campin Stadium, Bogota-Cundinamarca, Colombia', state: 'Active', symbol: ''},
  {category: 'Sports', name: 'NATIONAL VA SANTAFE', place: 'Antanasio Girardot Stadium, Bogota-Cundinamarca, Colombia', state: 'Inactive', symbol: ''},


];
