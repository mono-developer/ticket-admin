import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';

import { BaseService } from "./../../../provide/base-service";
import { DataService } from "./../../../provide/data-service";

@Component({
  selector: 'ms-users-manage',
  templateUrl: './users-manage.component.html',
  styleUrls: ['./users-manage.component.scss']
})
export class UsersManageComponent implements OnInit {

  page_title: string = 'Management of sales teams';

  url: string;
  token: string;
  isLoading: boolean = false;
  userList: any;


  displayedColumns = ['first_name', 'email', 'status', 'symbol'];
  dataSource: any;

  constructor(
    public baseService: BaseService,
    public dataService: DataService
  ) {

  }

  ngOnInit() {
    this.url = this.baseService.userURL;
    this.token = sessionStorage.getItem('token');
    this.getUsersList();
  }

  getUsersList() {
    this.isLoading = true;
    this.dataService.getData(this.url, this.token)
      .subscribe(
        (data) => {
          this.isLoading = false;
          console.log('userList', data);
          this.userList = data;
          this.dataSource = new MatTableDataSource(this.userList);
          return true;
        },
        err => {
          this.isLoading = false;
          console.log('errorData', err);
          return true;
        });
  }

  deleteUser(id) {
    this.isLoading = true;
    this.dataService.deleteData(this.url, id, this.token)
      .subscribe(
        (data) => {
          console.log('userData', data);
          this.getUsersList();
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
