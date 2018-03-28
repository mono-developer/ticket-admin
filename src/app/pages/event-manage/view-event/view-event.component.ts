import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { Router } from '@angular/router';
import { json } from 'd3';
import { BaseService } from "../../../../provide/base-service";
import { DataService } from "../../../../provide/data-service";

@Component({
  selector: 'ms-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.scss']
})
export class ViewEventComponent implements OnInit {

  page_title: string = 'Event Management';
  url: string;
  eventList: any;
  categoryList: any;
  displayedColumns = ['category', 'name', 'place', 'state', 'symbol'];
  dataSource: any;
  isLoading: boolean = false;
  constructor(
    public router: Router,
    public baseService: BaseService,
    public dataService: DataService
  ) { }

  ngOnInit() {
    this.url = this.baseService.eventURL;
    this.getEventList();
  }

  getEventList() {
    this.isLoading = true;
    this.dataService.getData(this.url)
      .subscribe(
        (data) => {
          this.isLoading = false;
          console.log('eventList', data);
          this.eventList = data;
          this.dataSource = new MatTableDataSource(this.eventList);
          return true;
        },
        err => {
          this.isLoading = false;
          console.log('errorData', err);
          return true;
        });
  }

  getCategoryName(id) {

    let longWords = this.categoryList.filter(word => word.length > 6);
  }


  edit(item: any) {
    console.log("senddata", item);
    this.router.navigate(['./dashboard/event-manage/add-event', { item: item._id }]);
  }

  delete(item: any) {
    this.isLoading = true;
    this.dataService.deleteData(this.url, item._id)
      .subscribe(
        (data) => {
          console.log('eventList', data);
          this.getEventList();
          return true;
        },
        error => {
          this.isLoading = false;
          console.log('errorData', error);
          return true;
        }
      )
  }

}



