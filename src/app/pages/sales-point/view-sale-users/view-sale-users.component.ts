import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { Router } from '@angular/router';
import { json } from 'd3';

import { BaseService } from "../../../../provide/base-service";
import { DataService } from "../../../../provide/data-service";
import { SlotDateTimeRangeRequest } from 'aws-sdk/clients/ec2';

@Component({
  selector: 'ms-view-sale-users',
  templateUrl: './view-sale-users.component.html',
  styleUrls: ['./view-sale-users.component.scss']
})
export class ViewSaleUsersComponent implements OnInit {
  page_title: string = 'Management of sales teams';
  url: string;
  token: string;
  usersList: Element[];
  displayedColumns = ['first_name', 'sales_email', 'phone', 'title', 'state', 'symbol'];
  dataSource: any;
  isLoading: boolean = false;

  constructor(
    public router: Router,
    public baseService: BaseService,
    public dataService: DataService) {
   }

  ngOnInit() {
    this.url = this.baseService.salesUserURL;
    this.getSalesUserList();
  }

  getSalesUserList() {
    this.isLoading = true;
    this.dataService.getData(this.url, this.token)
      .subscribe(
        (data) => {
          this.isLoading = false;
          console.log('salesList', data);
          this.usersList = data;
          this.dataSource = new MatTableDataSource(this.usersList);
          return true;
        },
        err => {
          this.isLoading = false;
          console.log('errorData', err);
          return true;
        });
  }

  edit(item: any) {
    this.router.navigate(['dashboard/sales-point/add-sale-users', { item: item._id }]);
  }

  delete(item: any) {
    this.isLoading = true;
    this.dataService.deleteData(this.url, item._id, this.token)
      .subscribe(
        (data) => {
          console.log('cmsData', data);
          this.getSalesUserList();
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

