import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { json } from 'd3';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { BaseService } from "../../../../provide/base-service";
import { DataService } from "../../../../provide/data-service";

@Component({
  selector: 'ms-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.scss']
})
export class ViewEventComponent implements OnInit {

  page_title: string = 'Event Management';
  bb: string = 'test' ;
  url: string;
  token: string;
  eventList: any;
  categoryList: any;
  displayedColumns = ['name', 'category', 'organizer', 'place', 'state', 'symbol'];
  dataSource: any;
  isLoading: boolean = false;
  constructor(
    public router: Router,
    public dialog: MatDialog,
    public baseService: BaseService,
    public dataService: DataService
  ) { }

  ngOnInit() {
    this.url = this.baseService.eventURL;
    this.token = sessionStorage.getItem('token');
    this.getEventList();
  }

  getEventList() {
    this.isLoading = true;
    this.dataService.getNoTokenData(this.url)
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

  edit(item: any) {
    console.log("senddata", item);
    this.router.navigate(['./dashboard/event-manage/add-event', { item: item._id, value: 'edit' }]);
  }

  duplicate(item: any) {
    console.log("senddata", item);
    this.router.navigate(['./dashboard/event-manage/add-event', { item: item._id, value: 'duplicate' }]);
  }

  delete(item) {
    let dialogRef1 = this.dialog.open(DeleteDialogComponent, {
      width: '350px',
      data: { alert: 'Do you want to delete this Event?' }
    });
    dialogRef1.afterClosed().subscribe(result => {
      result ? this.deleteEvent(item._id) : '';
    });
  }

  deleteEvent(id) {
    this.isLoading = true;
    this.dataService.deleteData(this.url, id, this.token)
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



