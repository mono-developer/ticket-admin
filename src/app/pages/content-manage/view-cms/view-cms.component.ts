import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { json } from 'd3';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { BaseService } from "../../../../provide/base-service";
import { DataService } from "../../../../provide/data-service";

@Component({
  selector: 'ms-view-cms',
  templateUrl: './view-cms.component.html',
  styleUrls: ['./view-cms.component.scss']
})
export class ViewCMSComponent implements OnInit {

  page_title: string = 'View Pages';
  url: string;
  token: string;
  cmsList: Element[];
  displayedColumns = ['title', 'description', 'state', 'symbol'];
  dataSource:any;
  isLoading: boolean;

  constructor(
    public router: Router,
    public dialog: MatDialog,
    public baseService: BaseService,
    public dataService: DataService
  ) { }

  ngOnInit() {
    this.url = this.baseService.contentURL;
    this.token = sessionStorage.getItem('token');
    this.getcmsList();
  }

  addCMS() {
    this.router.navigate(['dashboard/content-manage/add-cms']);
  }

  getcmsList(){
    this.isLoading = true;
    this.dataService.getData(this.url, this.token)
      .subscribe(
        (data) => {
          this.isLoading = false;
          this.cmsList = data;
          this.dataSource = new MatTableDataSource(this.cmsList);
          return true;
        },
        err => {
          this.isLoading = false;
          return true;
        });
  }

  edit(item: any) {
    this.router.navigate(['dashboard/content-manage/add-cms', { item: item._id }]);
  }

  delete(item) {
    let dialogRef1 = this.dialog.open(DeleteDialogComponent, {
      width: '350px',
      data: { alert: 'Do you want to delete this Content?' }
    });
    dialogRef1.afterClosed().subscribe(result => {
      result ? this.deleteItem(item._id) : '';
    });
  }

  deleteItem(id) {
    this.isLoading = true;
    this.dataService.deleteData(this.url, id, this.token)
      .subscribe(
        (data) => {
          this.getcmsList();
          return true;
        },
        error => {
          this.isLoading = false;
          return true;
        });
  }

  goSubpage(item) {
  }

}


